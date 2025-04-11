// src/contexts/ContractInteractionsContext.ts
import { createContext } from "react";

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