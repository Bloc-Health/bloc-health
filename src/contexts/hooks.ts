import { CONTRACT_ADDRESS } from "@/utils/constants";
import CONTRACT_ABI from "@/utils/abi";
import { Address, useReadContract } from "@starknet-react/core";
import { IAppointment, IEmergencyContact, IHospital, IPatientReturnInfo } from "../utils/interfaces";

export const useReadMainContract = (params) => {
  // const { chain } = useNetwork();

  const result = useReadContract({
    // address: chain.nativeCurrency.address,
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,

    ...params,
  });

  return result;
};

export const useGetAllPatients = (_hospitalId: string) => {
  const { data: allPatientsInfo } = useReadMainContract({
    functionName: "getAllPatients",
    args: [_hospitalId],
  });

  return allPatientsInfo as unknown as IPatientReturnInfo[];
}

export const useGetPatientsAppointments = (_hospitalId: string, _patientAddress: string) => {
  const { data: appointments } = useReadMainContract({
    functionName: "getPatientAppointments",
    args: [_hospitalId, _patientAddress],
  });

  return appointments as unknown as IAppointment[];
}

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

  return hospital as unknown as IHospital;
}

export const useIsHospitalStaff = (_hospitalId: string) => {
  const { data: isStaff } = useReadMainContract({
    functionName: "isHospitalStaff",
    args: [_hospitalId]
  });

  return isStaff as unknown as boolean;
}

export const useIsHospitalOwner = (_hospitalId: string, _connectedAddress?: Address) => {
  const hospital = useHospital(_hospitalId);
  return hospital && hospital.owner === _connectedAddress;
}
