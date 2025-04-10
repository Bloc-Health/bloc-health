// export const CONTRACT_ADDRESS = "0xC18BE11C81520Afb823BDedC44640B2b05BC5939";
export const CONTRACT_ADDRESS = "0xA13537E09393EbfF648aD50F43624a07714CA541";

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