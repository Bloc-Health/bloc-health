import { Link } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { useAccount } from "@starknet-react/core";
import useContractInteractions from '@/pages/Dashboard/useContractInteractions';
import { useIsHospitalOwner } from '@/contexts/hooks';
import { BellIcon, DashboardIcon, FileIcon, PersonIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';

const DashNav = () => {
    const { address } = useAccount();
    const { hospitalID } = useContractInteractions();
    const isHospitalOwner = useIsHospitalOwner(hospitalID, address);

    const navigation = [
        { name: 'Dashboard', to: '', icon: <DashboardIcon /> },
        { name: 'New Record', to: 'new-record', icon: <FileIcon /> },
        isHospitalOwner ? { name: 'Manage Staff', to: 'manage-staff', icon: <PersonIcon /> } : null,
        { name: 'Notifications', to: 'notifications', icon: <BellIcon /> },
    ].filter(Boolean);

    return (
        <div className='lg:hidden'>
            <Dialog>
                <DialogTrigger>
                    <button
                        type="button"
                        className="rounded-md p-2.5"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6" aria-hidden="true" />
                    </button>
                </DialogTrigger>
                <DialogContent className="fixed h-full left-32 z-50 w-2/3 bg-[#100E40] text-white px-6 py-6">
                    <div className="flex items-end justify-start">
                        <div className="ml-10 text-xl">
                            <span className='font-clash_semibold'>Bloc</span>Health
                        </div>
                    </div>
                    <div>
                        <div className="py-10 flex flex-col gap-5">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.to}
                                    className="flex items-center gap-2 ml-5 rounded-lg px-3 py-2 text-base leading-7 hover:bg-blue-800"
                                >
                                    {item.icon}
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="py-6">
                            <Link to="/"><Button size="lg" className="mt-5 w-full font-clash_semibold bg-[#2924A6] hover:bg-blue-800">Logout</Button></Link>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default DashNav;