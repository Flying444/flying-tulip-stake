import { ConnectButton, } from '@rainbow-me/rainbowkit';

export function Navigation() {
    return (
        <nav className="flex flex-col md:flex-row  w-full space-y-2 md:space-y-0 h-auto py-5 justify-center  md:items-end border-b-2 border-gray-700 bg-[#222222] ">
            <div className='flex w-full h-full md:w-1/2 justify-center  md:justify-start items-center md:items-start text-2xl md:text-4xl italic font-extrabold text-[#F5F57A] pl-4'>
                FLYING TULIP STAKE
            </div>
            <div className='flex w-full md:w-1/2 h-full justify-center items-center md:justify-end md:items-end '>
                <ConnectButton />
            </div>
        </nav>
    )
}