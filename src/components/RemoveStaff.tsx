import RemoveStaffTxBtn from "@/components/TransactionTemplate";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { isAddress } from "ethers";
import { useEffect, useState } from "react";
import useContractInteractions from "@/pages/Dashboard/useContractInteractions";


export function RemoveStaff() {
    const navigate = useNavigate();
    const { hospitalID } = useContractInteractions();

    const [staffAddress, setStaffAddress] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (staffAddress && !isAddress(staffAddress)) {
            setError("Invalid Ethereum address");
        } else {
            setError('');
        }
    }, [staffAddress]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="lg" className="bg-[#2924A6] hover:bg-blue-800">
                    Remove Staff
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0A092C] flex flex-col items-center justify-center max-md:max-w-[425px]">
                <DialogHeader className="w-2/3">
                    <DialogTitle className="font-clash_semibold">
                        Remove Hospital Staff
                    </DialogTitle>
                    <DialogDescription className="text-sm">
                        Enter the address of the staff member to remove from the hospital.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-3 justify-center mt-2">
                    <div>
                        <Input
                            placeholder="Staff Address"
                            value={staffAddress}
                            onChange={(e) => setStaffAddress(e.target.value)}
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>
                    <div className="w-fit mx-auto">
                        <RemoveStaffTxBtn
                            text="Remove Staff"
                            functionName="deleteHospitalStaff"
                            args={[hospitalID, staffAddress]}
                            onError={(e) => {
                                toast.error(e.message);
                                console.error(e.error);
                            }}
                            onSuccess={() => {
                                toast.success("Staff removed successfully");
                                navigate(-1);
                            }}
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
