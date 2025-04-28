import AddPatientTxBtn from "@/components/TransactionTemplate";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { IAddHospital } from "@/utils/interfaces";
import { useAccount } from "@starknet-react/core";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function AddModal({ info, isValidated }: { info: IAddHospital, isValidated: boolean }) {
    // console.log({
    //     info,
    //     entries: Object.entries(info),
    // })
    const navigate = useNavigate();
    const { account } = useAccount();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="lg" className="bg-[#2924A6] hover:bg-blue-800" disabled={!isValidated}>
                    Add Hospital
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0A092C] h-60 flex flex-col items-center justify-center max-md:max-w-[425px]">
                <DialogHeader className="w-2/3">
                    <DialogTitle className="font-clash_semibold">
                        Continue to Add Hospital
                    </DialogTitle>
                    <DialogDescription className="text-sm">
                        Are you sure you want to add hospital to BlocHealth?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-3 justify-center mt-5">
                    <AddPatientTxBtn
                        text="Proceed"
                        functionName="add_hospital"
                        args={[...Object.values(info), account?.address]}
                        onError={(e) => {
                            toast.error(e.message);
                            console.log(e.message);
                        }}
                        onStatus={(status) => {
                            console.log(status);
                        }}
                        onSuccess={(response) => {
                            console.log(response);
                            toast.success("Hospital added successfully");
                            navigate("/");
                        }}
                    />
                    <DialogClose>
                        <Button
                            variant="outline"
                            className="bg-transparent border-[#2924A6]"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}
