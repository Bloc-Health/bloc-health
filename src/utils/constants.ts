export const CONTRACT_ADDRESS = "0x030d4c408487b522a352f2c7d137d668a5f55adbc29fd757ee72534076f890ee";

export const epochToDateString = (epochTimestamp) => {
    const date = new Date(epochTimestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

export const shortenAddress = (address) => {
    if (address.length > 16) {
        const start = address.slice(0, 11);
        const end = address.slice(-5);
        return `${start}...${end}`;
    }
    return address;
};