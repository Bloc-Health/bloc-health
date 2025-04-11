# 🩺 BlocHealth Frontend

This is the frontend interface for **BlocHealth**, a decentralized application that allows hospitals, doctors, and patients to manage and share medical records securely on the blockchain. Built with **React** and **Next.js**, this interface connects to Starknet smart contracts and IPFS to interact with the decentralized backend.

---

## ✨ Features

- 🔐 Connect and authenticate using Starknet wallets (ArgentX, Braavos)
- 🧑‍⚕️ Role-based views for hospitals, doctors, and patients
- 📄 Upload and view encrypted medical records via IPFS
- 🔍 Verify record authenticity via on-chain data
- 🧩 Modular and clean UI built with Tailwind CSS

---

## 🧱 Technologies Used

- **React.js** & **Next.js**
- **Starknet React** – Starknet wallet and contract interaction
- **Tailwind CSS** – Styling
- **Shadcn UI** - Components Styling
- **IPFS** – Off-chain storage

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Wallet extension (ArgentX or Braavos)

---

### 📦 Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
yarn
```

---

### 🔨 Running the Dev Server

```bash
yarn dev
```

Then open your browser to [http://localhost:5173](http://localhost:5173)

---

## 🧪 Testing

You can use [Starknet Devnet](https://github.com/0xSpaceShard/starknet-devnet) or the Starknet testnet with a wallet like ArgentX to test the app functionality.

---

## 📁 Folder Structure

```
/src
├── assets          # File assets
├── components      # Reusable UI components
├── contexts        # React contexts
├── contracts       # Cairo contracts
├── pages           # Next.js pages
├── utils           # Starknet & IPFS helpers
```

---

## 🤝 Contributing

We welcome contributions! Open an issue or submit a pull request if you have suggestions or improvements.

---

## 🛡 License

MIT License. See [LICENSE](./LICENSE) for full details.