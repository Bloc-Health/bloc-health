import { ContractInteractionsContext } from "@/contexts/ContractInteractions";
import { useContext } from "react";

const useContractInteractions = () => useContext(ContractInteractionsContext);

export default useContractInteractions;
