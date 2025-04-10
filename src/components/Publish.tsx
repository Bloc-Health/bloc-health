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
import { IRecords } from "@/utils/interfaces";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function Publish({ info, isValidated }: { info: IRecords, isValidated: boolean }) {
    // console.log({
    //     info,
    //     entries: Object.entries(info),
    // })
    const navigate = useNavigate();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="lg" className="bg-[#2924A6] hover:bg-blue-800" disabled={!isValidated}>
                    Publish record
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0A092C] h-60 flex flex-col items-center justify-center max-md:max-w-[425px]">
                <DialogHeader className="w-2/3">
                    <DialogTitle className="font-clash_semibold">
                        Continue to Publish Record
                    </DialogTitle>
                    <DialogDescription className="text-sm">
                        Are you sure you want to publish this patient's record?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-3 justify-center mt-5">
                    <AddPatientTxBtn
                        text="Create record"
                        functionName="createPatientRecord"
                        args={Object.values(info)}
                        onError={(e) => {
                            toast.error(e.message);
                            console.log(e.error);
                        }}
                        onSuccess={() => {
                            toast.success("Record created successfully");
                            navigate("/dashboard");
                        }}
                    />
                    {/* <Button
                        variant="outline"
                        className="bg-transparent border-[#2924A6]"
                        onClick={() => console.log({
                            info,
                            entries: Object.entries(info),
                        })}
                    /> */}
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
