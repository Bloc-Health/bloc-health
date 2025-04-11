import { ContractInteractionsContext } from "./ContractInteractionsContext";
import { useReadMainContract } from "./hooks";
import { useState } from "react";

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
