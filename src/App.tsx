import './App.css'
import { Connector, useAccount, useConnect, useDisconnect } from "@starknet-react/core";

const App = () => {
  // Get StarkNet connection functions and state
  const { address, isConnected, status } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  // Handle wallet connection
  const handleConnect = (connector: Connector) => {
    connect({ connector });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-amber-300">BlocHealth</h1>

      {isConnected ? (
        <div className="mb-4">
          <p className="text-green-600 font-semibold">Connected!</p>
          <p className="break-all">Address: {address}</p>
          <button
            onClick={() => disconnect()}
            className="mt-2 bg-red-500 text-white py-2 px-4 rounded"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <p>Status: {status}</p>
          <div className="mt-4">
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => handleConnect(connector)}
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2 mb-2"
              >
                Connect with {connector.id}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;