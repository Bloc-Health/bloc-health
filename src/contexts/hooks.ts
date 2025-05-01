import { CONTRACT_ADDRESS } from "@/utils/constants";
import CONTRACT_ABI from "@/utils/abi";
import { Address, useReadContract } from "@starknet-react/core";
import { IAppointment, IEmergencyContact, IHospital, IPatientReturnInfo } from "../utils/interfaces";
import { num } from "starknet";

// Helper functions for type conversion
const toAddress = (input: any): Address => {
  if (input === undefined || input === null) return "0x0" as Address;
  return num.toHex(input) as Address;
};

const toString = (input: any): string => {
  if (input === undefined || input === null) return "";
  try {
    // Convert BigInt to a hex string and then decode it as UTF-8
    const hexString = num.toHex(input).slice(2); // Remove '0x' prefix
    const bytes = [];
    for (let i = 0; i < hexString.length; i += 2) {
      bytes.push(parseInt(hexString.substring(i, i + 2), 16));
    }
    return new TextDecoder().decode(new Uint8Array(bytes)).replace(/\0/g, '');
  } catch (error) {
    console.error("Error converting to string:", error);
    return String(input);
  }
};

const toBigInt = (input: any): bigint => {
  if (input === undefined || input === null) return BigInt(0);
  try {
    return BigInt(input);
  } catch (error) {
    console.error("Error converting to bigint:", error);
    return BigInt(0);
  }
};

const toNumber = (input: any): number => {
  if (input === undefined || input === null) return 0;
  try {
    return Number(input);
  } catch (error) {
    console.error("Error converting to number:", error);
    return 0;
  }
};

// Function to convert hospital data to proper types
const convertHospitalData = (rawHospital: any): IHospital | null => {
  if (!rawHospital) return null;
  return {
    name: toString(rawHospital.name),
    location: toString(rawHospital.location),
    DOE: toBigInt(rawHospital.DOE),
    hospitalRegNo: toBigInt(rawHospital.hospital_reg_no),
    patientCount: toBigInt(rawHospital.patient_count),
    staffCount: toBigInt(rawHospital.staff_count),
    owner: toAddress(rawHospital.owner)
  };
};

export const useReadMainContract = (params: any) => {
  const result = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    ...params,
  });
  return result;
};

export const UseGetOwner = () => {
  const { data: owner } = useReadMainContract({
    functionName: "get_owner",
    args: []
  });
  return toAddress(owner);
};

export const useGetHospital = (_hospitalId: string) => {
  const { data: hospital, error, isLoading } = useReadMainContract({
    functionName: "get_hospital",
    args: [_hospitalId],
  });
  const convertedHospital = convertHospitalData(hospital);
  return { hospital: convertedHospital, error, isLoading };
};

export const useGetAllPatients = (_hospitalId: string) => {
  const { data: allPatientsInfo } = useReadMainContract({
    functionName: "getAllPatients",
    args: [_hospitalId],
  });
  return allPatientsInfo as unknown as IPatientReturnInfo[];
};

export const useGetPatientsAppointments = (_hospitalId: string, _patientAddress: string) => {
  const { data: appointments } = useReadMainContract({
    functionName: "getPatientAppointments",
    args: [_hospitalId, _patientAddress],
  });
  return appointments as unknown as IAppointment[];
};

export const useGetPatientRecord = (_hospitalId: string, _patientAddress: string) => {
  const { data: patientInfo } = useReadMainContract({
    functionName: "getPatientRecord",
    args: [_hospitalId, _patientAddress],
  });
  return patientInfo as unknown as [IPatientReturnInfo, IEmergencyContact[]];
};

export const useHospital = (_hospitalId: string) => {
  const { data: hospital } = useReadMainContract({
    functionName: "hospitals",
    args: [_hospitalId]
  });
  return convertHospitalData(hospital);
};

export const useIsHospitalStaff = (_hospitalId: string) => {
  const { data: isStaff } = useReadMainContract({
    functionName: "get_owner",
    args: [_hospitalId]
  });
  return isStaff as unknown as boolean;
};

export const useIsHospitalOwner = (_hospitalId: string, _connectedAddress?: Address) => {
  const hospital = useHospital(_hospitalId);
  return hospital && hospital.owner === _connectedAddress;
};