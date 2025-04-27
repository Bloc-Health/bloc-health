import Header from "@/components/Header";
import { Card } from "@/components/ui/card";

const shortenUni = (uni) => {
    if (uni.length > 28) {
        const baseName = uni.slice(0, 28);
        return `${baseName}...`;
    }
    return uni;
};

const Clients = () => {
    const hospitals = [
        { image: "/images/uniben.png", name: "University of Benin Teaching Hospital", location: "Ugbowo" },
        { image: "/images/irrua.png", name: "Irrua Specialist Teaching Hospital", location: "Ugbowo" },
        { image: "/images/uniben.png", name: "University of Benin Teaching Hospital", location: "Ugbowo" },
        { image: "/images/irrua.png", name: "Irrua Specialist Teaching Hospital", location: "Ugbowo" },
        { image: "/images/uniben.png", name: "University of Benin Teaching Hospital", location: "Ugbowo" },
        { image: "/images/irrua.png", name: "Irrua Specialist Teaching Hospital", location: "Ugbowo" },
        { image: "/images/uniben.png", name: "University of Benin Teaching Hospital", location: "Ugbowo" },
        { image: "/images/irrua.png", name: "Irrua Specialist Teaching Hospital", location: "Ugbowo" },
        { image: "/images/uniben.png", name: "University of Benin Teaching Hospital", location: "Ugbowo" },
        { image: "/images/irrua.png", name: "Irrua Specialist Teaching Hospital", location: "Ugbowo" },
    ];

    return (
        <div className='flex flex-col justify-between p-10 px-5 lg:px-20 min-h-screen'>
            <Header />

            <div className="mt-10 lg:w-1/3 max-md:text-center flex flex-col gap-3">
                <p className="text-4xl max-md:text-2xl"><span className="font-clash_semibold">Bloc</span>Health is Revolutionizing Healthcare Onchain</p>
                <p>A detailed list of hospitals that have fully embraced our onchain record solution</p>
            </div>

            <div className="flex flex-wrap lg:justify-between lg:gap-y-5 max-md:justify-center max-md:gap-4 max-md:text-sm mt-10">
                {hospitals.map((hospital, index) => (
                    <Card className="flex rounded-4xl gap-16 max-md:gap-2 items-center justify-between p-2 px-6 border-none bg-[#35F3F324]" key={index}>
                        <img src={hospital.image} alt={hospital.name} />
                        {shortenUni(hospital.name)}
                        <p>{hospital.location}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Clients;
