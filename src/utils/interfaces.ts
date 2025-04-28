export enum AccessRoles {
  Doctor,
  Staff,
  Nurse,
  Admin,
}

export enum Gender {
  Male,
  Female,
  Other,
}

export interface IHospital {
  name: string;
  location: string;
  DOE: bigint;
  hospitalRegNo: bigint;
  staffCount: bigint;
  patientCount: bigint;
  owner: string;
  roles: {
    [key: string]: IStaff;
  }
  patientAddresses: string[];
  patients: {
    [key: string]: IPatient;
  }
}

export interface IStaff {
  name: string;
  role: AccessRoles;
  email: string;
  phone: string;
}

export interface IPatient {
  name: string;
  DOB: bigint;
  gender: Gender;
  contactInfo: IContactInfo;
  medicalInfo: IMedicalInfo;
  appointmentCount: bigint;
  appointmentDates: bigint[];
  appointments: {
    [key: number]: IAppointment;
  }
  emergencyContacts: IEmergencyContact[];
}

export interface IPatientReturnInfo {
  name: string;
  DOB: bigint;
  gender: Gender;
  contactInfo: IContactInfo;
  medicalInfo: IMedicalInfo;
}

export interface IContactInfo {
  phone: string;
  email: string;
  residentialAddress: string;
  nextOfKin: string;
  nextOfKinPhoneNumber: string;
  nextOfKinResidentialAddress: string;
  healthInsured: boolean;
}

export interface IMedicalInfo {
  currentMedications: string;
  allergies: string;
  medicalHistoryFile: string;
}

export interface IEmergencyContact {
  name: string;
  phone: string;
  residentialAddress: string;
}

export interface IAppointment {
  currentMedications: string;
  diagnosis: string;
  treatmentPlan: string;
  date: bigint;
  reason: string;
}

export interface IAddHospital {
  // _hospitalId: string;
  _name: string;
  _location: string;
  _DOE: number;
  _hospitalRegNo: number;
}

export interface IUpdateStaffRoles {
  _hospitalId: string;
  _address: string;
  _name: string;
  _role: AccessRoles;
  _email: string;
  _phone: string;
}

export interface IRecords {
  _hospitalId: string;
  _patient: string;
  _name: string;
  _gender: Gender;
  _DOB: number;
  _contactInfo: IContactInfo;
  _medicalInfo: IMedicalInfo;
  _emergencyContacts: IEmergencyContact[];
}

export interface IUploadAppointment {
  _hospitalId: string;
  _patient: string;
  _date: bigint;
  _appointment: IAppointment;
}