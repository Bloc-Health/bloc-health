// src/contexts/ContractInteractionsContext.ts
import { createContext } from "react";
import { UseGetOwner } from "./hooks";

type TContractInteractions = {
  owner: string;
  hospitalCount: number;
  hospitalID: string;
  setHospitalID: (id: string) => void;
};

// testing
const owner = UseGetOwner();

export const ContractInteractionsContext = createContext<TContractInteractions>(
  {
    owner: "0x0000000000000000000000000000000000000000",
    hospitalCount: 0,
    hospitalID: owner,
    setHospitalID: () => { },
  }
);