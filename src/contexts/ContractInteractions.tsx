import { useReadMainContract } from "./hooks";
import { createContext, useState } from "react";

type TContractInteractions = {
  owner: string;
  hospitalCount: number;
  hospitalID: string;
  setHospitalID: (id: string) => void;
};

export const ContractInteractionsContext = createContext<TContractInteractions>(
  {
    owner: "0x0000000000000000000000000000000000000000",
    hospitalCount: 0,
    hospitalID: "",
    setHospitalID: () => {},
  }
);

export const ContractInteractionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: owner } = useReadMainContract({
    functionName: "owner",
  });

  const { data: hospitalCount } = useReadMainContract({
    functionName: "hospitalCount",
  });

  // const publishedPatients = useMemo(() => {
  //   if (!allPatientsInfo) return [];
  //   return (allPatientsInfo as IPatient[]).filter(
  //     (patient) => patient.isPublished
  //   );
  // }, [allPatientsInfo]);

  // const pendingPatients = useMemo(() => {
  //   if (!allPatientsInfo) return [];
  //   return (allPatientsInfo as IPatient[]).filter(
  //     (patient) => !patient.isPublished
  //   );
  // }, [allPatientsInfo]);

  // Add state for hospitalID
  const [hospitalID, setHospitalID] = useState<string>("");

  return (
    <ContractInteractionsContext.Provider
      value={{
        owner: owner as unknown as string,
        hospitalCount: Number(hospitalCount),
        hospitalID,
        setHospitalID,
      }}
    >
      {children}
    </ContractInteractionsContext.Provider>
  );
};
