import { ConnectButton, } from '@rainbow-me/rainbowkit';

export function Navigation() {
    return (
        <nav className="flex flex-col md:flex-row  w-full space-y-2 md:space-y-0 h-40 py-5 justify-center border-b-2 border-gray-700 bg-[#222222] ">
            <div className='flex w-full h-full md:w-1/2 justify-center italic items-center text-2xl md:text-[28px]  font-extrabold text-[#F5F57A]'>
                STAKEBASE
            </div>
            <div className='flex w-full md:w-1/2 h-full justify-center items-center '>
                <ConnectButton accountStatus={'address'}  />
            </div>
        </nav>
    )
}