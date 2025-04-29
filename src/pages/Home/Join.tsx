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
import useContractInteractions from "../Dashboard/useContractInteractions";
// import { useIsHospitalStaff } from "@/contexts/hooks";
import { useGetHospital } from "@/contexts/hooks";


export function Join() {
    const navigate = useNavigate();
    const { hospitalID, setHospitalID } = useContractInteractions();
    const hospital = useGetHospital(hospitalID);
    console.log(hospital);
    // const isStaff = useIsHospitalStaff(hospitalID);

    const handleSubmit = () => {
        if (!hospital.name) {
            toast.error("Invalid Hospital ID");
            return;
        }
        // if (isStaff === false) {
        //     toast.error("You are not a staff of this hospital");
        //     return;
        // }
        navigate(`/dashboard`, { state: { hospitalID } });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="lg" className="bg-[#2924A6] hover:bg-blue-800 cursor-pointer">
                    Join Hospital
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0A092C] h-60 flex flex-col items-center justify-center max-md:max-w-[425px]">
                <DialogHeader className="w-2/3">
                    <DialogTitle className="font-clash_semibold">
                        View Hospital Database
                    </DialogTitle>
                    <DialogDescription className="text-sm">
                        Enter ID to view and manage your hospital records dashboard.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-3 justify-center mt-5">
                    <Input placeholder="Enter Hospital ID" value={hospitalID} onChange={(e) => setHospitalID(e.target.value)} />
                    <Button className="bg-[#2924A6] hover:bg-blue-800" onClick={handleSubmit}>Submit</Button>
                </div>
            </DialogContent >
        </Dialog >
    );
}
