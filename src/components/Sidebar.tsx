import { Link, useLocation } from 'react-router-dom';
import { BellIcon, DashboardIcon, FileIcon, PersonIcon } from '@radix-ui/react-icons';
import { useAccount } from "@starknet-react/core";
import useContractInteractions from '@/pages/Dashboard/useContractInteractions';
import { useIsHospitalOwner } from '@/contexts/hooks';
import { Button } from './ui/button';

const Sidebar = () => {
    const { address } = useAccount();
    const { hospitalID } = useContractInteractions();
    const isHospitalOwner = useIsHospitalOwner(hospitalID, address);

    const location = useLocation();
    // console.log(location.pathname);

    const navigation = [
        { name: 'Dashboard', to: '', icon: <DashboardIcon /> },
        { name: 'New Record', to: 'new-record', icon: <FileIcon /> },
        isHospitalOwner ? { name: 'Manage Staff', to: 'manage-staff', icon: <PersonIcon /> } : null,
        { name: 'Notifications', to: 'notifications', icon: <BellIcon /> },
    ].filter(Boolean);

    return (
        <div className='bg-[#181662] fixed hidden lg:flex flex-col items-center justify-start p-10 py-20 min-h-screen'>
            <div className="flex flex-col gap-16">
                <div className="text-xl pl-10">
                    <span className='font-clash_semibold'>Bloc</span>Health
                </div>
                <div className='flex flex-col gap-8'>
                    {navigation.map((item) => {
                        // console.log(item.to);
                        return (
                            <Link
                                key={item?.name}
                                to={item.to}
                                className={`flex item?s-center gap-3 rounded-lg py-2 px-8 text-base leading-7
                                ${location.pathname === `dashboard/${item?.to}` ? 'bg-blue-800' : 'hover:bg-blue-800'}`}
                            >
                                {item?.icon}
                                {item?.name}
                            </Link>
                        )
                    })}
                    <div className="py-6 mt-20">
                        <Link to="/"><Button size="lg" className="mt-5 w-full font-clash_semibold bg-[#2924A6] hover:bg-blue-800">Logout</Button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar