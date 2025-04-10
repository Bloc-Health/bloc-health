import { Card } from "@/components/ui/card";
import { IPatientReturnInfo } from "../utils/interfaces";
import { Link } from "react-router-dom";
// import useContractInteractions from "@/pages/Dashboard/useContractInteractions";
// import { useHospital } from "@/contexts/hooks";

const PatientCard = ({
  patient,
  index,
}: {
  patient: IPatientReturnInfo;
  index: number;
}) => {
  // const { hospitalID } = useContractInteractions();
  // const hospital = useHospital(hospitalID);
  // console.log(hospital);

  return (
    <Card className="bg-[#35F3F324] p-3 px-5 w-[49%] max-md:w-full">
      <Link
        to={`${index}`}
        className="flex items-center justify-between"
      >
        <div className="lg:flex-1 flex items-center gap-3">
          <img
            src={`/images/patient${((index + 1) % 4 === 0 ? 4 : (index + 1) % 4)}.png`}
            alt={patient.name}
          />
          <div>
            <p className="font-clash_semibold">{patient.name}</p>
            <p>ID: {Number(index) + 1}</p>
          </div>
        </div>
        {/* <p
        className={`lg:flex-1 font-clash_medium ${patient.isPublished ? "text-green-500" : "text-red-500"
          }`}
      >
        {patient.isPublished ? "Published" : "Unpublished"}
      </p> */}
        <p className="lg:flex-2">Shared(6)</p>
      </Link>
    </Card>
  )
};

export default PatientCard;
