// import { Button } from '@/components/ui/button'
import Header from '@/components/Header'
import { WalletConnect } from '@/components/Connect'
import { useAccount } from "@starknet-react/core";
import HomeC from './HomeC';

const Home = () => {
  const { isConnected } = useAccount();

  if (isConnected) {
    return <HomeC />
  }

  return (
    <div className='flex flex-col justify-between p-10 px-5 lg:px-20 pb-0 min-h-screen'>
      <Header />

      <div className='flex flex-col gap-5 items-center justify-center text-center'>
        <p className='lg:text-7xl text-3xl font-clash_semibold w-3/5'>Patient Records all in one Place.</p>
        <p className='lg:w-1/2'>Empowering patients and providers with real-time, transparent, and tamper-proof data management for better care and peace of mind.</p>
        {/* <div className='mt-5'>
          <Button size='lg' className='bg-[#2924A6]'>Connect Wallet</Button>
        </div> */}
        <WalletConnect />
      </div>

      <div className='mx-auto'>
        <img src="/images/cuate.png" alt="" />
      </div>
    </div>
  )
}

export default Home