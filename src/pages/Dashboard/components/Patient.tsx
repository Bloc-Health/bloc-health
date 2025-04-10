import { Button } from "@/components/ui/button";
import {
    useGetPatientRecord, useGetPatientsAppointments,
} from "@/contexts/hooks";
import { IEmergencyContact, IPatientReturnInfo } from "@/utils/interfaces";
import { Cross1Icon, OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { useNavigate, useParams } from "react-router-dom";
import useContractInteractions from "../useContractInteractions";
import { shortenAddress } from "@/utils/constants";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Patient = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { hospitalID } = useContractInteractions();
    const patientInfo = useGetPatientRecord(hospitalID, "0xB2AF542dA937A6aC46228eBA63f21A7EFc40C70E");
    const appointments = useGetPatientsAppointments(hospitalID, "0xB2AF542dA937A6aC46228eBA63f21A7EFc40C70E");
    console.log(appointments);
    console.log(appointments && appointments[Number(id)]);

    const appointment = appointments && appointments[Number(id)];

    if (!patientInfo || !Array.isArray(patientInfo)) {
        console.error("patientInfo is undefined or not an array");
        return (
            <div className="grid place-content-center min-h-[calc(100vh-2rem)]">
                Loading...
            </div>
        );
    }

    const [patientDetails, emergencyContacts] = patientInfo as [IPatientReturnInfo, IEmergencyContact[]];

    if (!patientDetails) {
        console.error("patientDetails is undefined");
        return (
            <div className="grid place-content-center min-h-[calc(100vh-2rem)]">
                No patient details found.
            </div>
        );
    }

    if (Array.isArray(patientDetails)) {
        console.error("patientDetails is an array of emergency contacts");
        return (
            <div className="grid place-content-center min-h-[calc(100vh-2rem)]">
                No emergency contacts found.
            </div>
        );
    }

    const { name, DOB, medicalInfo = { allergies: "", currentMedications: "", medicalHistoryFile: "" },
        contactInfo = { email: "", healthInsured: false, nextOfKin: "", nextOfKinPhoneNumber: 0, nextOfKinResidentialAddress: "", phone: 0, residentialAddress: "" }
    } = patientDetails as IPatientReturnInfo;

    return (
        <div className="pt-10 px-5 lg:px-20 min-h-screen overflow-x-hidden">
            <div className="mt-5 flex items-center justify-between">
                <div className="lg:flex-1 flex items-center gap-3">
                    <img
                        src={`/images/patient${(Number(id + 1) % 4 === 0 ? 4 : Number(id + 1) % 4)}.png`}
                        alt={name}
                    />
                    <div>
                        <p className="font-clash_semibold">{name}</p>
                        <p>ID: {Number(id) + 1}</p>
                    </div>
                </div>
                <div className="flex gap-5">
                    <OpenInNewWindowIcon />
                    <Cross1Icon className="cursor-pointer" onClick={() => navigate(-1)} />
                </div>
            </div>

            <div className="mt-10 flex flex-col gap-14 max-md:gap-10">
                <div className="flex max-md:flex-col gap-20 max-md:gap-10">
                    <div className="">
                        <p className="font-clash_medium">Address:</p>
                        <p>{shortenAddress('0xB2AF542dA937A6aC46228eBA63f21A7EFc40C70E') || 'None'}</p>
                    </div>
                    <div className="">
                        <p className="font-clash_medium">Date of birth:</p>
                        <p>{DOB ? new Date(Number(DOB) * 1000).toDateString() : 'N/A'}</p>
                    </div>
                    <div className="">
                        <p className="font-clash_medium">Allergies:</p>
                        <p>{medicalInfo.allergies || 'None'}</p>
                    </div>

                </div>
                <div className="flex flex-wrap gap-20 max-md:gap-10">
                    <div className="lg:w-[20%]">
                        <p className="font-clash_medium">Date of last visit:</p>
                        <p>{new Date(Number(appointment.date) * 1000).toDateString() || 'N/A'}</p>
                    </div>
                    <div className="">
                        <p className="font-clash_medium">Diagnosis:</p>
                        <p>{appointment.diagnosis || 'N/A'}</p>
                    </div>
                    <div className="">
                        <p className="font-clash_medium">Treatment Plan:</p>
                        <p>{appointment.treatmentPlan || 'N/A'}</p>
                    </div>
                    <div className="">
                        <p className="font-clash_medium">Current medications:</p>
                        <p>{appointment.currentMedications || 'N/A'}</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-20 max-md:gap-10">
                    <div className="lg:w-[20%]">
                        <p className="font-clash_medium">Next of kin:</p>
                        <p>{contactInfo.nextOfKin || 'N/A'}</p>
                    </div>
                    <div className="">
                        <p className="font-clash_medium">Next of Kin Phone:</p>
                        <p>+234 {contactInfo.nextOfKinPhoneNumber || 'N/A'}</p>
                    </div>
                    <div className="">
                        <p className="font-clash_medium">Next of Kin Address:</p>
                        <p>{contactInfo.nextOfKinResidentialAddress || 'N/A'}</p>
                    </div>
                </div>

                <div className="flex flex-col max-md:flex-wrap gap-5">
                    <p className="font-clash_medium">Emergency Contacts:</p>
                    <Table className="w-2/3 max-md:w-full">
                        <TableHeader>
                            <TableRow className="border-b-gray-500">
                                <TableHead>Name</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Address</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {emergencyContacts.length > 0 ? (
                            emergencyContacts.map((contact, index) => (
                                <TableRow key={index} className="border-b-0">
                                    <TableCell>{contact.name}</TableCell>
                                    <TableCell>{contact.phone}</TableCell>
                                    <TableCell>{contact.residentialAddress}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <p>No emergency contacts listed.</p>
                        )}
                        </TableBody>
                    </Table>
                </div>

                <div className="mb-10 flex max-md:flex-col gap-5 max-md:gap-3">
                    <Button
                        variant="outline"
                        size="lg"
                        className="bg-transparent border-[#2924A6]"
                        onClick={() => navigate(-1)}
                    >
                        Close
                    </Button>
                    <Button size="lg" className="bg-[#2924A6]">
                        Share record
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Patient;
