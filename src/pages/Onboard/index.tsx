import Header from "@/components/Header"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { epochToDateString } from "@/utils/constants";
import { IAddHospital } from "@/utils/interfaces";
import { useEffect, useState } from "react";
import { AddModal } from "./AddModal";
import { useNavigate } from "react-router-dom";

const Onboard = () => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState<boolean>(false);

    const [errors, setErrors] = useState({
        _hospitalId: "",
        _name: "",
        _location: "",
        _DOE: "",
        _hospitalRegNo: ""
    });

    const [hospitalInfo, setHospitalInfo] = useState<IAddHospital>({
        _hospitalId: "",
        _name: "",
        _location: "",
        _DOE: 0,
        _hospitalRegNo: 0
    });

    const validate = () => {
        const newErrors = {
            _hospitalId: hospitalInfo._hospitalId.trim().length === 0 ? "Hospital ID is required" : "",
            _name: hospitalInfo._name.trim().length === 0 ? "Name is required" : "",
            _location: hospitalInfo._location.trim().length === 0 ? "Location is required" : "",
            _DOE: hospitalInfo._DOE === 0 ? "Date of establishment is required" : "",
            _hospitalRegNo: hospitalInfo._hospitalRegNo === 0 ? "Hospital registration number is required" : ""
        };
        // hospitalInfo._hospitalId.trim().length > 0 && setErrors(newErrors);
        setErrors(newErrors);
        return !Object.values(newErrors).some(errorMsg => errorMsg !== '');
        // return Object.values(newErrors).every((err) => err.length === 0);
    }

    useEffect(() => {
        const isValid = validate();
        setValidated(isValid);
        console.log(validated);
    }, [hospitalInfo])

    return (
        <div className='flex flex-col justify-between p-10 px-5 lg:px-20 pb-0 min-h-scree'>
            <Header />

            <div className="mt-5 flex max-md:flex-col items-center lg:mx-16 lg:gap-40">
                <div className="flex flex-col gap-3">
                    <p className="text-4xl max-md:text-2xl">Add your Hospital to <span className="font-clash_semibold">Bloc</span>Health.</p>
                    <p className="max-md:text-sm lg:w-5/6">Create your hospital profile on BlocHealth and explore endless possibilities and innovation.</p>
                </div>
                <img src="/images/doctors.png" alt="doctors" className="w-2/5" />
            </div>

            <div className="flex justify-between items-center mt-10">
                <div>
                    <p className="text-2xl max-md:text-xl font-clash_semibold">Onboard your Hospital</p>
                    <p className="font-clash_light">Create new hospital record</p>
                </div>
                {/* <Cross1Icon className="cursor-pointer"/> */}
            </div>

            <div className="mt-5">
                <p className="font-clash_medium">Hospital Details:</p>
                <div className="mt-3 flex flex-col gap-4">
                    <div className="flex max-md:flex-wrap items-center gap-3">
                        <div className="w-full">
                            <Input
                                id="name"
                                type="text"
                                placeholder="Hospital Name"
                                value={hospitalInfo._name}
                                onChange={(e) => setHospitalInfo({ ...hospitalInfo, _name: e.target.value })}
                            />
                            {errors._name && <p className="mt-2 text-red-500 text-xs">{errors._name}</p>}
                        </div>
                        <div className="w-full">
                            <Input
                                id="name"
                                type="text"
                                placeholder="Hospital Address"
                                value={hospitalInfo._location}
                                onChange={(e) => setHospitalInfo({ ...hospitalInfo, _location: e.target.value })}
                            />
                            {errors._location && <p className="mt-2 text-red-500 text-xs">{errors._location}</p>}
                        </div>
                    </div>
                    <div className="flex max-md:flex-wrap items-center gap-3">
                        <div className="w-full">
                            <Input
                                id="name"
                                type="text"
                                placeholder="Hospital registration number"
                                value={hospitalInfo._hospitalRegNo > 0 ? hospitalInfo._hospitalRegNo : ""}
                                onChange={(e) => setHospitalInfo({ ...hospitalInfo, _hospitalRegNo: Number(e.target.value) })}
                            />
                            {errors._hospitalRegNo && <p className="mt-2 text-red-500 text-xs">{errors._hospitalRegNo}</p>}
                        </div>
                        <div className="w-full">
                            <Input
                                id="name"
                                type="date"
                                placeholder="Date of establishment"
                                value={hospitalInfo._DOE > 0 ? epochToDateString(hospitalInfo._DOE) : ""}
                                onChange={(e) => {
                                    const date = new Date(e.target.value);
                                    const epochTimestamp = date.getTime() / 1000;
                                    setHospitalInfo({ ...hospitalInfo, _DOE: epochTimestamp });
                                }}
                            />
                            {errors._DOE && <p className="mt-2 text-red-500 text-xs">{errors._DOE}</p>}
                        </div>
                        <div className="w-full">
                            <Input
                                id="name"
                                type="number"
                                placeholder="Hospital ID"
                                value={hospitalInfo._hospitalId}
                                onChange={(e) => setHospitalInfo({ ...hospitalInfo, _hospitalId: e.target.value })}
                            />
                            {errors._hospitalId && <p className="mt-2 text-red-500 text-xs">{errors._hospitalId}</p>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-14 mb-10 flex items-end justify-between">
                <div className="flex max-md:flex-col gap-5 max-md:gap-3">
                    <Button variant="outline" size="lg" className="bg-transparent hover:bg-[#2924A6] hover:text-white" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                </div>
                <div className="flex max-md:flex-col gap-5 max-md:gap-3">
                    <AddModal info={hospitalInfo} isValidated={validated} />
                </div>
                {/* <TransactionTemplate
                    text="Add Hospital"
                    functionName="addHospital"
                    args={Object.values(hospitalInfo)}
                /> */}
            </div>
        </div>
    )
}

export default Onboard