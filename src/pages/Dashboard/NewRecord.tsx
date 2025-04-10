import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link2Icon } from "@radix-ui/react-icons";
import { Publish } from "../../components/Publish";
// import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  Gender,
  IContactInfo,
  IEmergencyContact,
  IMedicalInfo,
  IRecords,
} from "@/utils/interfaces";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "react-hot-toast";
import { useAccount } from "@starknet-react/core";
import { isAddress } from "ethers";
import { epochToDateString } from "@/utils/constants";
import useContractInteractions from "./useContractInteractions";

const shortenFileName = (fileName) => {
  if (fileName.length > 20) {
    const extension = fileName.split('.').pop();
    const baseName = fileName.slice(0, 20 - extension.length - 3);
    return `${baseName}...${extension}`;
  }
  return fileName;
};

const NewRecord = () => {
  // const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { hospitalID } = useContractInteractions();

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [validated, setValidated] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    name: '',
    address: '',
    medications: '',
    gender: '',
    dob: '',
    // diagnosis: '',
    // treatmentPlan: '',
    allergies: '',
    phone: '',
    email: '',
    residentialAddress: '',
    nextOfKin: '',
    nextOfKinPhoneNumber: '',
    nextOfKinResidentialAddress: '',
    emergencyContacts: '',
    healthInsured: ''
  });

  const [basicInfo, setBasicInfo] = useState<
    Omit<
      IRecords,
      "_contactInfo" | "_emergencyContacts" | "_medicalInfo" | "_isPublished"
    >
  >({
    _hospitalId: hospitalID,
    _patient: "",
    _name: "",
    _gender: Gender.Other, // check default, was null before nut type ish
    _DOB: 0,
  });

  const [medicalInfo, setMedicalInfo] = useState<IMedicalInfo>({
    currentMedications: "",
    allergies: "",
    // diagnosis: "",
    // treatmentPlan: "",
    medicalHistoryFile: "",
  });

  const [contactInfo, setContactInfo] = useState<IContactInfo>({
    phone: "",
    residentialAddress: "",
    email: "",
    nextOfKin: "",
    nextOfKinPhoneNumber: "",
    nextOfKinResidentialAddress: "",
    healthInsured: false, // check default here too
  });

  const [emergencyContacts, setEmergencyContacts] = useState<
    IEmergencyContact[]
  >([
    {
      name: "",
      phone: "",
      residentialAddress: "",
    },
    {
      name: "",
      phone: "",
      residentialAddress: "",
    },
  ]);

  const combinedInfo = useMemo<IRecords>(() => {
    return {
      ...basicInfo,
      _contactInfo: contactInfo,
      _medicalInfo: medicalInfo,
      // _isPublished: false,
      _emergencyContacts: emergencyContacts,
    };
  }, [basicInfo, contactInfo, emergencyContacts, medicalInfo]);

  const validateInputs = () => {
    const newErrors = {
      name: basicInfo._name.trim() === '' ? 'Full name is required' : '',
      address: !isAddress(basicInfo._patient) ? 'Invalid Ethereum address' : '',
      medications: medicalInfo.currentMedications.trim() === '' ? 'Medications are required' : '',
      gender: basicInfo._gender === null ? 'Please select a gender' : '',
      dob: basicInfo._DOB === 0 ? 'Date of birth is required' : '',
      // diagnosis: medicalInfo.diagnosis.trim() === '' ? 'Diagnosis is required' : '',
      // treatmentPlan: medicalInfo.treatmentPlan.trim() === '' ? 'Treatment plan is required' : '',
      allergies: medicalInfo.allergies.trim() === '' ? 'Allergies are required' : '',
      phone: contactInfo.phone.trim() === '' ? 'Phone number is required' : '',
      email: contactInfo.email.trim() === '' ? 'Email is required' : '',
      residentialAddress: contactInfo.residentialAddress.trim() === '' ? 'Residential address is required' : '',
      nextOfKin: contactInfo.nextOfKin.trim() === '' ? 'Next of kin is required' : '',
      nextOfKinPhoneNumber: contactInfo.nextOfKinPhoneNumber.trim() === '' ? 'Next of kin phone number is required' : '',
      nextOfKinResidentialAddress: contactInfo.nextOfKinResidentialAddress.trim() === '' ? 'Next of kin address is required' : '',
      healthInsured: contactInfo.healthInsured === null ? 'Please select health insurance status' : '',
      emergencyContacts: emergencyContacts.some(contact => contact.name.trim() === '' || contact.phone.trim() === '' || contact.residentialAddress.trim() === '')
        ? 'All emergency contacts must be filled'
        : ''
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some(errorMsg => errorMsg !== '');
  };


  useEffect(() => {
    const savedRecord = localStorage.getItem("patientRecord");

    if (savedRecord) {
      const parsedRecord: IRecords = JSON.parse(savedRecord);

      setBasicInfo({
        _hospitalId: parsedRecord._hospitalId,
        _patient: parsedRecord._patient,
        _name: parsedRecord._name,
        _gender: parsedRecord._gender,
        _DOB: parsedRecord._DOB,
      });

      setMedicalInfo(parsedRecord._medicalInfo);
      setContactInfo(parsedRecord._contactInfo);
      setEmergencyContacts(parsedRecord._emergencyContacts);

    }
  }, [combinedInfo._medicalInfo.medicalHistoryFile]);

  if (!isConnected) {
    return (
      <div className="p-10 px-5 lg:px-20 lg:min-h-screen">
        <div className="flex flex-col justify-center items-center h-[80vh]">
          <p className="text-3xl max-md:text-xl">Please connect your wallet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-5 lg:px-14 min-h-screen">
      <div className="flex justify-between items-center lg:mt-5">
        <div>
          <p className="text-2xl font-clash_semibold">New Record</p>
          <p className="font-clash_light">Create new patient record</p>
        </div>
        {/* <Cross1Icon className="cursor-pointer" onClick={() => navigate(-1)} /> */}
      </div>

      <div className="mt-5">
        <p className="font-clash_medium">Patient's Personal Details:</p>
        <div className="mt-3 flex flex-col gap-4">
          <div className="flex max-md:flex-wrap items-center gap-3">
            <div className="w-full">
              <Input
                id="name"
                type="text"
                placeholder="Full Name"
                value={basicInfo._name}
                onChange={(e) =>
                  setBasicInfo({ ...basicInfo, _name: e.target.value })
                }
              />
              {errors.name && <p className="mt-2 text-red-500 text-xs">{errors.name}</p>}
            </div>
            <div className="w-full">
              <Input
                id="address_id"
                type="text"
                placeholder="Address ID"
                value={basicInfo._patient}
                onChange={(e) => setBasicInfo({ ...basicInfo, _patient: e.target.value })}
              />
              {errors.address && <p className="mt-2 text-red-500 text-xs">{errors.address}</p>}
            </div>
            <div className="w-full">
              <Input
                id="medications"
                type="text"
                placeholder="Current medications"
                value={medicalInfo.currentMedications}
                onChange={(e) =>
                  setMedicalInfo({
                    ...medicalInfo,
                    currentMedications: e.target.value,
                  })
                }
              />
              {errors.medications && <p className="mt-2 text-red-500 text-xs">{errors.medications}</p>}
            </div>
            <div className="w-full">
              <RadioGroup className="flex" value={basicInfo._gender} onValueChange={(value) => setBasicInfo({ ...basicInfo, _gender: value as unknown as Gender })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem className="border-[#2924A6]/80 text-blue-300" value={Gender.Male} id="r1" />
                  <Label htmlFor="r1">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem className="border-[#2924A6]/80 text-blue-300" value={Gender.Female} id="r2" />
                  <Label htmlFor="r2">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem className="border-[#2924A6]/80 text-blue-300" value={Gender.Other} id="r3" />
                  <Label htmlFor="r3">Other</Label>
                </div>
              </RadioGroup>
              {errors.gender && <p className="mt-2 text-red-500 text-xs">{errors.gender}</p>}
            </div>
          </div>
          <div className="flex max-md:flex-wrap gap-3">
            <div className="relative grid w-full lg:max-w-sm items-center gap-1.5">
              <Input
                id="picture"
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 z-10 cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setMedicalInfo({
                      ...medicalInfo,
                      medicalHistoryFile: file.name,
                    })
                    console.log("sam here", file.name);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setImageSrc(reader.result as string);
                    };

                    reader.readAsDataURL(file)
                  }
                }}
              />
              <div className="flex items-center justify-start px-3 w-full h-full border border-gradient border-gray-300 rounded-md">
                {medicalInfo.medicalHistoryFile == ""
                  ?
                  <span className="text-gray-500 text-sm w-full flex max-md:flex-col max-md:py-2 items-center justify-between">
                    Upload medical history
                    <Link2Icon />
                  </span>
                  :
                  <div className="flex max-md:py-2 items-center gap-2">
                    <img src={imageSrc} className="w-5 object-contain" alt="Uploaded Medical File Preview" />
                    <p className="max-md:text-xs">Uploaded {shortenFileName(medicalInfo.medicalHistoryFile)}</p>
                  </div>}
              </div>
            </div>
            <div className="w-full">
              <Input
                id="date"
                type="date"
                placeholder="Date of Birth (dd/mm/yyyy)"
                value={
                  basicInfo._DOB > 0
                    ? epochToDateString(basicInfo._DOB)
                    : ""
                }
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  const epochTimestamp = date.getTime() / 1000;

                  setBasicInfo({ ...basicInfo, _DOB: epochTimestamp });
                }}
              />
              {errors.dob && <p className="mt-2 text-red-500 text-xs">{errors.dob}</p>}
            </div>
            <div className="w-full">
              <Input
                id="allergies"
                type="text"
                placeholder="Allergies"
                value={medicalInfo.allergies}
                onChange={(e) => setMedicalInfo({ ...medicalInfo, allergies: e.target.value })} />
              {errors.allergies && <p className="mt-2 text-red-500 text-xs">{errors.allergies}</p>}
            </div>
          </div>
          {/* <div className="flex gap-3">
            <div className="w-full">
              <Input
                id="diagnosis"
                type="text"
                placeholder="Diagnosis"
                value={medicalInfo.diagnosis}
                onChange={(e) =>
                  setMedicalInfo({ ...medicalInfo, diagnosis: e.target.value })
                }
              />
              {errors.diagnosis && <p className="mt-2 text-red-500 text-xs">{errors.diagnosis}</p>}
            </div>
            <div className="w-full">
              <Input
                id="treatment"
                type="text"
                placeholder="Treatment plan"
                value={medicalInfo.treatmentPlan}
                onChange={(e) =>
                  setMedicalInfo({
                    ...medicalInfo,
                    treatmentPlan: e.target.value,
                  })
                }
              />
              {errors.treatmentPlan && <p className="mt-2 text-red-500 text-xs">{errors.treatmentPlan}</p>}
            </div>
          </div> */}
        </div>
      </div>

      <div className="mt-5">
        <p className="font-clash_medium">Contact Info:</p>
        <div className="mt-3 flex flex-col gap-4">
          <div className="flex max-md:flex-wrap gap-3">
            <div className="w-full">
              <Input
                id="phone"
                type="number"
                placeholder="Phone number"
                value={contactInfo.phone}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, phone: e.target.value })
                }
              />
              {errors.phone && <p className="mt-2 text-red-500 text-xs">{errors.phone}</p>}
            </div>
            <div className="w-full">
              <Input
                id="email"
                type="email"
                placeholder="Email address"
                value={contactInfo.email}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, email: e.target.value })
                }
              />
              {errors.email && <p className="mt-2 text-red-500 text-xs">{errors.email}</p>}
            </div>
            <div className="w-full">
              <Input
                id="address"
                type="text"
                placeholder="Residential address"
                value={contactInfo.residentialAddress}
                onChange={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    residentialAddress: e.target.value,
                  })
                }
              />
              {errors.residentialAddress && <p className="mt-2 text-red-500 text-xs">{errors.residentialAddress}</p>}
            </div>
          </div>
          <div className="flex max-md:flex-wrap gap-3">
            <div className="w-full">
              <Input
                id="kin"
                type="text"
                placeholder="Next of kin"
                value={contactInfo.nextOfKin}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, nextOfKin: e.target.value })
                }
              />
              {errors.nextOfKin && <p className="mt-2 text-red-500 text-xs">{errors.nextOfKin}</p>}
            </div>
            <div className="w-full">
              <Input
                id="kin_phone"
                type="number"
                placeholder="Next of kin phone number"
                value={contactInfo.nextOfKinPhoneNumber}
                onChange={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    nextOfKinPhoneNumber: e.target.value,
                  })
                }
              />
              {errors.nextOfKinPhoneNumber && <p className="mt-2 text-red-500 text-xs">{errors.nextOfKinPhoneNumber}</p>}
            </div>
            <div className="w-full">
              <Input
                id="kin_address"
                type="text"
                placeholder="Next of kin residential address"
                value={contactInfo.nextOfKinResidentialAddress}
                onChange={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    nextOfKinResidentialAddress: e.target.value,
                  })
                }
              />
              {errors.nextOfKinResidentialAddress && <p className="mt-2 text-red-500 text-xs">{errors.nextOfKinResidentialAddress}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex gap-5 items-center">
          <p className="font-clash_medium">Health Insurance:</p>
          <RadioGroup className="flex" value={contactInfo.healthInsured} onValueChange={(value) => setContactInfo({ ...contactInfo, healthInsured: value as unknown as boolean })}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem className="border-[#2924A6]/80 text-blue-300" value={true} id="r1" />
              <Label htmlFor="r1">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem className="border-[#2924A6]/80 text-blue-300" value={false} id="r2" />
              <Label htmlFor="r2">No</Label>
            </div>
          </RadioGroup>
        </div>
        {errors.healthInsured && <p className="mt-2 text-red-500 text-xs">{errors.healthInsured}</p>}
      </div>

      <div className="mt-5">
        <p className="font-clash_medium">Emergency Contacts:</p>
        <div className="mt-3 flex flex-col gap-4">
          {emergencyContacts.map((contact, index) => (
            <div className="flex max-md:flex-wrap gap-3" key={index}>
              <Input
                id={`emg_name${index + 1}`}
                type="text"
                placeholder={`Contact name ${index + 1}`}
                value={contact.name}
                onChange={(e) => {
                  const newContacts = [...emergencyContacts];
                  newContacts[index].name = e.target.value;
                  setEmergencyContacts(newContacts);
                }}
              />
              <Input
                id={`emg_phone${index + 1}`}
                type="number"
                placeholder={`Phone number ${index + 1}`}
                value={contact.phone}
                onChange={(e) => {
                  const newContacts = [...emergencyContacts];
                  newContacts[index].phone = e.target.value;
                  setEmergencyContacts(newContacts);
                }}
              />
              <Input
                id="emg_address1"
                type="text"
                placeholder={`Residential address ${index + 1}`}
                value={contact.residentialAddress}
                onChange={(e) => {
                  const newContacts = [...emergencyContacts];
                  newContacts[index].residentialAddress = e.target.value;
                  setEmergencyContacts(newContacts);
                }}
              />
            </div>
          ))}
          {errors.emergencyContacts && <p className="text-red-500 text-xs">{errors.emergencyContacts}</p>}
        </div>
      </div>

      <div className="mt-14 mb-10 flex items-end justify-between">
        <div className="flex max-md:flex-col gap-5 max-md:gap-3">
          <Button size="lg" className="bg-[#2924A6] hover:bg-blue-800" onClick={() => {
            localStorage.setItem('patientRecord', JSON.stringify(combinedInfo));
          }}>
            Save
          </Button>
          {/* <Button size="lg" className="bg-[#2924A6]" onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}>
            Clear
          </Button> */}
        </div>
        {/* <Button size='lg' className='bg-[#2924A6]'>Publish record</Button> */}
        <div onClick={() => {
          if (validateInputs()) {
            setValidated(true);
            localStorage.clear();
          } else {
            toast.error('Please fix the validation errors before submitting');
          }
        }}>
          <Publish isValidated={validated} info={combinedInfo} />
        </div>
      </div>
    </div>
  );
};

export default NewRecord;
