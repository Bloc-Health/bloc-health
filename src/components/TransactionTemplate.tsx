import React, { useState } from 'react';
import { useContract, useAccount, useSendTransaction, Address } from '@starknet-react/core';
import { CallData } from 'starknet';

interface TransactionButtonProps {
  contractAddress: Address;
  abi: any[];
  functionName: string;
  args: any[];
  text: string;
  onSuccess?: (txHash: string) => void;
  onError?: (error: Error) => void;
}

const TransactionButton: React.FC<TransactionButtonProps> = ({
  contractAddress,
  abi,
  functionName,
  args,
  text,
  onSuccess,
  onError
}) => {
  const { account } = useAccount();
  const { contract } = useContract({
    address: contractAddress,
    abi
  });

  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Setup contract write hook
  const { writeAsync } = useSendTransaction({
    calls: contract ? [
      {
        contractAddress: contractAddress,
        entrypoint: functionName,
        calldata: CallData.compile(args)
      }
    ] : []
  });

  const handleTransaction = async () => {
    if (!account || !contract) {
      setError("Please connect your wallet first");
      return;
    }

    setLoading(true);
    setError(null);
    setTxHash(null);

    try {
      const response = await writeAsync();
      const hash = response.transaction_hash;
      setTxHash(hash);
      setLoading(false);

      if (onSuccess) {
        onSuccess(hash);
      }
    } catch (err) {
      console.error("Transaction failed:", err);
      setError(err instanceof Error ? err.message : "Transaction failed");
      setLoading(false);

      if (onError && err instanceof Error) {
        onError(err);
      }
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