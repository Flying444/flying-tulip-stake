import { useState, useEffect } from "react"
import { useAccount } from "wagmi";
//import { formatEther } from "viem";
import { Hero } from "./components/Hero";
import { Navigation } from "./components/Navigation";
import { Navmenu } from "./components/NavMenu";
import { ConnectButton } from '@rainbow-me/rainbowkit';
//import { useTvl } from "./hooks/useTvl";


import { TCard } from "./types";


//#F5F57A bg-[#1A1A1A] , useBalance bg-[#222222]
function App() {
  const { isConnected } = useAccount()
  // const chainId = useChainId()
  const [tvl, setTvl] = useState<TCard[]>([{ namePool: "Mainnet", totalAmount: 0 }, { namePool: "BSC", totalAmount: 0 }, { namePool: "Sonic", totalAmount: 0 }])
 /*  const [userStats, setUserStats] = useState({ deposited: 0, earned: 0 })

   const abis = [];
   const time = 3 * 60 * 60 * 1000;
   const ETH_POOL = "0x8ecEbc2BF559D96c663E6cCD80e2C78431E0d9E9";
   const BNB_POOL = "0x1ab93AB4AdB4D6a915fccE56770d63AdFB91880f";
   const SONIC_POOL = "0x..."; */


  // const test = useTvl(ETH_POOL)

  useEffect(() => {
    const fetchTvl = async () => {
      setTvl([
        { namePool: "Mainnet", totalAmount: 1254.32 },
        { namePool: "BSC", totalAmount: 876.54 },
        { namePool: "Sonic", totalAmount: 342.21 }
      ])
  
      /*  if (address) {
         setUserStats({
           deposited: 5.2,
           earned: 1.8
         }) 
       } */
    }

    fetchTvl()
  }, [])


  return (

    <div className="flex flex-col w-full pb-10 items-center bg-[#1A1A1A] text-white">
      <Navigation />
      <Hero />
      <div className="flex flex-col w-full md:w-1/2 h-auto md:mt-10 border-gray-700 items-center border-2 rounded-3xl py-4">
        <div className="w-full text-center">
          <h1 className="text-2xl font-extrabold italic">STAKE</h1>
        </div>
        <div className="flex flex-col space-y-4 w-full justify-center items-center  p-4">
          <Navmenu tvl={tvl} />
        </div>
        {!isConnected && (<ConnectButton label={"Connect Wallet"} />)}
        
      </div>
    </div>
  );
}

export default App;
