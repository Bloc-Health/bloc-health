import { Link } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { WalletConnect } from './Connect';

const navigation = [
    { name: 'Home', to: '/' },
    { name: 'Our Clients', to: '/clients' },
    { name: 'How it works', to: '' },
];

const NavButton = () => {
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
                {/* <div className="fixed inset-0 z-50" /> */}
                <DialogContent className="fixed h-[70vh] right-0 z-50 text-center justify-center bg-[#100E40]/80 w-3/4 rounded-2xl text-white px-6 py-6">
                    <div className="flex items-end justify-center">
                        <Link to="/" className="text-xl">
                            <span className='font-clash_semibold'>Bloc</span>Health
                        </Link>
                    </div>
                    {/* <div className="flow-root"> */}
                    <div>
                        <div className="py-6">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.to}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 hover:bg-blue-800"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="py-6 gap-5">
                            <WalletConnect />
                        </div>
                    </div>
                    {/* </div> */}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default NavButton;