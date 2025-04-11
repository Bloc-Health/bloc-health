import { ContractInteractionsContext } from "@/contexts/ContractInteractionsContext";
import { useContext } from "react";

const useContractInteractions = () => useContext(ContractInteractionsContext);

export default useContractInteractions;
