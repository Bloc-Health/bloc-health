import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { useAccount } from "@starknet-react/core";

const generateNotificationText = (name: string) => `${name} has a pending record that needs to be updated`;
const generateAppointmentText = (name: string) => `You have an appointment with ${name}`;


const notifications = [
    {
        notif: generateNotificationText("Jason Dave"),
        id: "51862C",
        img: "/images/update.png",
    },
    {
        notif: generateAppointmentText("Peace Angel and 20 others"),
        id: "51862C",
        img: "/images/appoint.png",
    },
    {
        notif: generateNotificationText("Jason Dave"),
        id: "51862C",
        img: "/images/update.png",
    },
    {
        notif: generateAppointmentText("Peace Angel and 20 others"),
        id: "51862C",
        img: "/images/appoint.png",
    },
    {
        notif: generateNotificationText("Jason Dave"),
        id: "",
        img: "/images/update.png",
    },
]

const Notifications = () => {

    const { isConnected } = useAccount();

    if (!isConnected) {
        return (
            <div className="p-10 px-5 lg:px-20 lg:min-h-screen">
                <div className="flex flex-col justify-center items-center h-[80vh]">
                    <p className="text-3xl max-md:text-xl">Please connect your wallet</p>
                </div>
            </div>
        );
    }

    return (
        <div className='pt-5 px-5 lg:px-14 min-h-screen'>
            <div className='flex justify-between items-center lg:mt-5'>
                <div>
                    <p className='text-2xl font-clash_semibold'>Notifications (5)</p>
                    <p className='font-clash_light'>See all your notifications</p>
                </div>
                {/* <Cross1Icon className="cursor-pointer" onClick={() => navigate(-1)} /> */}
            </div>

            <div className="mt-8">
                <div className="flex flex-col gap-5">
                    {notifications.map((notification) => (
                        <Card className="text-sm flex max-md:flex-col max-md:gap-2 items-center justify-between p-4 px-6 border-none bg-[#35F3F324]" key={notification.id}>
                            <div className="flex- pr-10 flex max-md:text-center items-center gap-3">
                                <img src={notification.img} alt="" className="w-7" />
                                <p>{notification.notif}</p>
                            </div>
                            {notification.id && <div className="flex-1 text-center">ID: {notification.id}</div>}
                            <div className="text-right"><ChevronDownIcon /></div>
                        </Card>
                    ))}
                </div>
            </div>

            <div className='mt-10 mb-10 flex justify-between max-md:flex-col gap-5 max-md:gap-3'>
                <Button size='lg' disabled={true} className='bg-[#2924A6]'>Previous</Button>
                <Button size='lg' className='bg-[#2924A6]'>Next</Button>
            </div>

        </div>
    )
}

export default Notifications