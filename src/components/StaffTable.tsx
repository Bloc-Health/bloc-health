import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { shortenAddress } from "@/utils/constants";
import { BookmarkIcon, TrashIcon } from "@radix-ui/react-icons";

const staffs = [
    {
        name: "Dr. Johnson Sule",
        address: shortenAddress("0x2ds887dj2od98dklns887dj2od98dklns82od98"),
        phoneNo: "08145693020",
        email: "johnsule@gmail.com",
    },
    {
        name: "Dr. Peace Alo",
        address: shortenAddress("0x2ds887dj2od98dklns887dj2od98dklns82od98"),
        phoneNo: "08055841810",
        email: "peacealo2@gmail.com",
    },
    // {
    //     name: "Dr. Johnson Sule",
    //     address: shortenAddress("0x2ds887dj2od98dklns887dj2od98dklns82od98"),
    //     phoneNo: "08145693020",
    //     email: "johnsule@gmail.com",
    // },
    // {
    //     name: "Dr. Peace Alo",
    //     address: shortenAddress("0x2ds887dj2od98dklns887dj2od98dklns82od98"),
    //     phoneNo: "08055841810",
    //     email: "peacealo2@gmail.com",
    // },
    // {
    //     name: "Dr. Johnson Sule",
    //     address: shortenAddress("0x2ds887dj2od98dklns887dj2od98dklns82od98"),
    //     phoneNo: "08145693020",
    //     email: "johnsule@gmail.com",
    // },
    // {
    //     name: "Dr. Peace Alo",
    //     address: shortenAddress("0x2ds887dj2od98dklns887dj2od98dklns82od98"),
    //     phoneNo: "08055841810",
    //     email: "peacealo2@gmail.com",
    // },
    // {
    //     name: "Dr. Johnson Sule",
    //     address: shortenAddress("0x2ds887dj2od98dklns887dj2od98dklns82od98"),
    //     phoneNo: "08145693020",
    //     email: "johnsule@gmail.com",
    // },
    // {
    //     name: "Dr. Peace Alo",
    //     address: shortenAddress("0x2ds887dj2od98dklns887dj2od98dklns82od98"),
    //     phoneNo: "08055841810",
    //     email: "peacealo2@gmail.com",
    // },
    // {
    //     name: "Dr. Johnson Sule",
    //     address: shortenAddress("0x2ds887dj2od98dklns887dj2od98dklns82od98"),
    //     phoneNo: "08145693020",
    //     email: "johnsule@gmail.com",
    // },
]

const StaffTable = () => {
    return (
        <Table>
            <TableHeader className="bg-[#1D1A77]">
                <TableRow className="font-clash_medium border-none shadow-sm">
                    <TableHead className="text-white text-center">Name</TableHead>
                    <TableHead className="text-white text-center">Wallet Address</TableHead>
                    <TableHead className="text-white text-center">Email Address</TableHead>
                    <TableHead className="text-white text-center">Phone Number</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="text-gray-300text-center ">
                {staffs.map((staff, index) => (
                    <TableRow key={index} className="border-[#2924A6]/50">
                        <TableCell className="text-center font-medium border-r border-[#2924A6]/50">{staff.name}</TableCell>
                        <TableCell className="text-center border-r border-[#2924A6]/50">{staff.address}</TableCell>
                        <TableCell className="text-center border-r border-[#2924A6]/50">{staff.email}</TableCell>
                        <TableCell className="text-center border-r border-[#2924A6]/50">{staff.phoneNo}</TableCell>
                        <TableCell className="flex justify-center gap-5">
                            <BookmarkIcon color="green" className="cursor-pointer w-5 h-5" />
                            <TrashIcon className="cursor-pointer w-5 h-5" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default StaffTable;
