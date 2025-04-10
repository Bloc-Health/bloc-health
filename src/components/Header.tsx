import { Link } from 'react-router-dom'
import NavButton from './NavButton'
import { WalletConnect } from './Connect'

const Header = () => {
    return (
        <div className='flex items-center justify-between'>
            <Link to="/" className='text-xl'><span className='font-clash_semibold'>Bloc</span>Health</Link>
            <NavButton />
            <div className='hidden lg:flex align-center gap-10'>
                <Link to="/">Home</Link>
                <Link to="/clients">Our Clients</Link>
                <Link to="">How it works</Link>
            </div>
            <div className='max-md:hidden gap-3'>
                <WalletConnect />
            </div>
        </div>
    )
}

export default Header