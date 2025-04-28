export const CONTRACT_ADDRESS = "0x1a3098d3b97331cd586bd6134f8be3c6e8cea5dba857e96aef4dbc282c6712a";

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