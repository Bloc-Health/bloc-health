import './App.css'
import { Connector, useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { StarknetProvider } from './components/starknet-provider.tsx';
import { Toaster } from "react-hot-toast";
// import { Buffer } from "buffer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/index.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import NewRecord from "./pages/Dashboard/NewRecord.tsx";
import Patients from "./pages/Dashboard/components/Patients.tsx";
import Patient from "./pages/Dashboard/components/Patient.tsx";
import Appointments from "./pages/Dashboard/components/Appointments.tsx";
import Shared from "./pages/Dashboard/components/Shared.tsx";
import Pending from "./pages/Dashboard/components/Pending.tsx";
import Notifications from "./pages/Dashboard/Notifications.tsx";
import Clients from "./pages/Clients/index.tsx";
import Onboard from "./pages/Onboard/index.tsx";
import Dash from "./pages/Dashboard/index.tsx";
import ManageStaff from "./pages/Dashboard/ManageStaff.tsx";

// globalThis.Buffer = Buffer;

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/clients",
      element: <Clients />,
    },
    {
      path: "onboard",
      element: <Onboard />,
    },
    {
      path: "dashboard",
      element: <Dash />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "new-record",
          element: <NewRecord />,
        },
        {
          path: "notifications",
          element: <Notifications />,
        },
        {
          path: "manage-staff",
          element: <ManageStaff />,
        },
        {
          path: "patients",
          element: <Patients />,
        },
        {
          path: ":type/:id",
          element: <Patient />,
        },
        {
          path: "appointments",
          element: <Appointments />,
        },
        {
          path: "shared",
          element: <Shared />,
        },
        {
          path: "pending",
          element: <Pending />,
        },
        {
          path: "example",
          element: <Example />,
        },
      ],
    },
    {
      path: "*",
      element: <NoMatch />,
    }
  ]);

  return (
    <StarknetProvider>
      {/* <ContractInteractionsProvider> */}
        <RouterProvider router={router} />
        <Toaster />
      {/* </ContractInteractionsProvider> */}
    </StarknetProvider>
  );
};

function NoMatch() {
  return (
    <div className="grid place-content-center h-screen max-md:text-xl text-3xl">
      <h2>404: Page Not Found</h2>
      <p>Uh oh! Wrong page 😞</p>
    </div>
  );
}

const Example = () => {
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
            className="mt-2 bg-red-500 text-white py-2 px-4 rounded cursor-pointer"
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
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2 mb-2 cursor-pointer"
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