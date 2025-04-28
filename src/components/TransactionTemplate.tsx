import React, { useEffect, useState } from 'react';
import { useContract, useAccount, useSendTransaction } from '@starknet-react/core';
import { Abi, CallData } from 'starknet';
import { CONTRACT_ADDRESS } from "@/utils/constants";
import CONTRACT_ABI from "@/utils/abi";


interface TransactionButtonProps {
  functionName: string;
  args: Abi[];
  text: string;
  onSuccess?: (txHash: string) => void;
  onStatus?: (status: string) => void;
  onError?: (error: Error) => void;
}

const TransactionButton: React.FC<TransactionButtonProps> = ({
  functionName,
  args,
  text,
  onSuccess,
  onStatus,
  onError
}) => {
  const { account } = useAccount();
  const { contract } = useContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
  });

  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Setup contract write hook
  const { sendAsync: writeAsync, status } = useSendTransaction({
    calls: contract ? [
      {
        contractAddress: CONTRACT_ADDRESS,
        entrypoint: functionName,
        calldata: CallData.compile(args)
      }
    ] : []
  });
  // const { sendAsync: writeAsync } = useSendTransaction({
  // calls: contract ? [contract.populate(functionName, CallData.compile(args))] : undefined,
  // });

  useEffect(() => {
    if (onStatus) {
      onStatus(status);
      console.log(status);
    }
  }, [status, onStatus]);

  const handleTransaction = async () => {
    if (!account || !contract) {
      setError("Please connect your wallet first");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await writeAsync();
      const hash = response.transaction_hash;
      setTxHash(hash);

      if (onSuccess) onSuccess(hash);
    } catch (err) {
      console.error("Transaction failed:", err);
      const message = err instanceof Error ? err.message : "Transaction failed";
      setError(message);

      if (onError && err instanceof Error) onError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleTransaction}
        disabled={loading || !account}
        className={`px-4 py-2 rounded font-medium transition-colors ${!account
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : loading
            ? 'bg-blue-300 text-blue-700 cursor-wait'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
      >
        {loading ? 'Processing...' : text}
      </button>

      {txHash && (
        <div className="mt-2 p-2 bg-green-100 border border-green-300 rounded">
          <p className="text-green-700 text-sm font-medium">Transaction sent!</p>
          <p className="text-green-800 text-xs break-all">
            Hash: {txHash}
          </p>
          <a href={`https://testnet.starkscan.co/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">
            View on StarkScan
          </a>
        </div>
      )}

      {error && (
        <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded">
          <p className="text-red-700 text-sm">Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default TransactionButton;