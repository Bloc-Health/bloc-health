import AddStaffTxBtn from "@/components/TransactionTemplate";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "@radix-ui/react-label";
import { AccessRoles, IUpdateStaffRoles } from "@/utils/interfaces";
import { useEffect, useState } from "react";
import { isAddress } from "ethers";
import useContractInteractions from "@/pages/Dashboard/useContractInteractions";

export function AddStaff() {
    const navigate = useNavigate();
    const { hospitalID } = useContractInteractions();
    const [validated, setValidated] = useState<boolean>(false);
    const [staffInfo, setStaffInfo] = useState<IUpdateStaffRoles>({
        _hospitalId: hospitalID,
        _address: "",
        _name: "",
        _role: 0,
        _email: "",
        _phone: "",
    });

    const [errors, setErrors] = useState({
        _hospitalId: "",
        _address: "",
        _name: "",
        _role: "",
        _email: "",
        _phone: "",
    });

    const validate = () => {
        const newErrors = {
            _hospitalId: staffInfo._hospitalId.trim().length === 0 ? "Hospital ID is required" : "",
            _address: !isAddress(staffInfo._address) ? 'Invalid Ethereum address' : '',
            _name: staffInfo._name.trim().length === 0 ? "Name is required" : "",
            _role: staffInfo._role === null ? "Role is required" : "",
            _email: staffInfo._email.trim().length === 0 ? "Email is required" : "",
            _phone: staffInfo._phone.trim().length === 0 ? "Phone no is required" : ""
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(errorMsg => errorMsg !== '');
        // return Object.values(newErrors).every((err) => err.length === 0);
    }

    useEffect(() => {
        validate() && setValidated(true);
        !validate() && setValidated(false);
        console.log(validated);
    }, [staffInfo])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="lg" className="bg-[#2924A6] hover:bg-blue-800">
                    Add Staff
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0A092C] flex flex-col items-center justify-center max-md:max-w-[425px]">
                <DialogHeader className="w-2/3">
                    <DialogTitle>
                        Add Staff Members
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3 justify-center mt-3">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap max-md:flex-wrap items-center gap-3">
                            <div className="w-full">
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Full name"
                                    value={staffInfo._name}
                                    onChange={(e) => setStaffInfo({ ...staffInfo, _name: e.target.value })}
                                />
                                {errors._name && <p className="mt-2 text-red-500 text-xs">{errors._name}</p>}
                            </div>
                            <div className="w-full">
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Wallet address/basename"
                                    value={staffInfo._address}
                                    onChange={(e) => setStaffInfo({ ...staffInfo, _address: e.target.value })}
                                />
                                {errors._address && <p className="mt-2 text-red-500 text-xs">{errors._address}</p>}
                            </div>
                            <div>
                                <RadioGroup className="flex" value={staffInfo._role} onValueChange={(value) => setStaffInfo({ ...staffInfo, _role: value as unknown as AccessRoles })}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem className="border-[#2924A6]/80 text-blue-300" value={AccessRoles.Doctor} id="r1" />
                                        <Label htmlFor="r1">Doctor</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem className="border-[#2924A6]/80 text-blue-300" value={AccessRoles.Staff} id="r3" />
                                        <Label htmlFor="r3">Staff</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem className="border-[#2924A6]/80 text-blue-300" value={AccessRoles.Nurse} id="r2" />
                                        <Label htmlFor="r2">Nurse</Label>
                                    </div>
                                </RadioGroup>
                                {errors._role && <p className="mt-2 text-red-500 text-xs">{errors._role}</p>}
                            </div>
                            <div className="w-full">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={staffInfo._email}
                                    onChange={(e) => setStaffInfo({ ...staffInfo, _email: e.target.value })}
                                />
                                {errors._email && <p className="mt-2 text-red-500 text-xs">{errors._email}</p>}
                            </div>
                            <div className="w-full">
                                <Input
                                    id="phone"
                                    type="text"
                                    placeholder="Phone"
                                    value={staffInfo._phone}
                                    onChange={(e) => setStaffInfo({ ...staffInfo, _phone: e.target.value })}
                                />
                                {errors._phone && <p className="mt-2 text-red-500 text-xs">{errors._phone}</p>}
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="mt-3">
                        <div className="w-fit max-md:mx-auto max-md:mt-2">
                            <AddStaffTxBtn
                                text="Add Staff"
                                functionName="updateHospitalStaffRoles"
                                args={Object.values(staffInfo)}
                                onError={(e) => {
                                    toast.error(e.message);
                                    console.log(e.error);
                                }}
                                onSuccess={() => {
                                    toast.success("Staff added successfully");
                                    navigate("-1");
                                }}
                            />
                        </div>
                        <DialogClose>
                            <Button
                                variant="outline"
                                className="bg-transparent border-[#2924A6]"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                    </DialogFooter>

                </div>
            </DialogContent>
        </Dialog>
    );
}
