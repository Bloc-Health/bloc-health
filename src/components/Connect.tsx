import { Connector, useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, ChevronUp, Copy } from "lucide-react";

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, error } = useConnect();
  const { disconnect } = useDisconnect();

  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleConnect = (connector: Connector) => {
    connect({ connector });
    setIsOpen(false);
  };

  // Copy address to clipboard
  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }
  };

  const displayAddress = isConnected && address
    ? `${address?.substring(0, 6)}...${address?.substring(address.length - 4)}`
    : '';


  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        duration: 1000,
        style: {
          fontSize: '14px',
        },
      });
    }
  }, [error]);

  return (
    <div ref={containerRef} className="relative">
      {/* Main Button with Address */}
      {isConnected ? (
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center gap-2 bg-blue-600 FFC0CB hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          <span>{displayAddress}</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      ) : (
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Connect Wallet
        </Button>
      )}

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
          {isConnected ? (
            <div className="p-3">
              <div className="mb-3 bg-gray-700 p-2 rounded-md">
                <p className="flex flex-col gap-1 text-gray-300 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-200">Address:</span>{' '}
                    <Button
                      onClick={copyAddress}
                      className="ml-2 p-1 h-auto bg-transparent hover:bg-gray-600 text-gray-300"
                      title="Copy to clipboard"
                    >
                      {isCopied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                    </Button>
                  </div>
                  <span className="break-all">{address}</span>
                </p>
              </div>
              <Button
                onClick={() => disconnect()}
                variant="destructive"
                className="w-full bg-red-500 hover:bg-red-600 text-white text-sm py-1 cursor-pointer"
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <div className="p-3 space-y-2">
              {connectors?.map((connector) => (
                <Button
                  key={connector.id}
                  onClick={() => handleConnect(connector)}
                  className={cn(
                    'w-full text-sm py-1',
                    'bg-blue-500 hover:bg-blue-600 text-white',
                    'cursor-pointer',
                  )}
                >
                  {connector.name || connector.id}
                </Button>
              ))}
              {(connectors?.length || 0) === 0 && (
                <p className="text-gray-400 text-xs py-2">No connectors available.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}