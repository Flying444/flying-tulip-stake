import { useState, useEffect } from "react"
import { WagmiProvider, useAccount  } from "wagmi";
//import { formatEther } from "viem";
import TvlCard from "./components/TvlCard"
import { config } from './lib/wagmi.config'
import { TCard } from "./types";

//#F5F57A bg-[#1A1A1A] , useBalance, useChainId , isConnected 
function App() {
  const { address, isConnected } = useAccount()
 // const chainId = useChainId()
  const [tvl, setTvl] = useState([{ name: "Mainnet", total: 0 },{name: "BNB", total: 0},{ name: "Sonic", total: 0}])
  const [userStats, setUserStats] = useState({ deposited: 0, earned: 0 })

 /*  const abis = [];
  const time = 3 * 60 * 60 * 1000;
  const ETH_POOL = "0x8ecEbc2BF559D96c663E6cCD80e2C78431E0d9E9";
  const BNB_POOL = "0x1ab93AB4AdB4D6a915fccE56770d63AdFB91880f";
  const SONIC_POOL = "0x..."; */

  useEffect(() => {
    const fetchTvl = async () => {
      setTvl([
        {name: "Mainnet", total: 1254.32},
        {name: "BNB", total: 876.54},
        {name: "Sonic", total: 342.21}
      ])
      
      if (address) {
        setUserStats({
          deposited: 5.2,
          earned: 1.8
        }) 
      }
    }

    fetchTvl()
  }, []) 


  return (
    <WagmiProvider config={config}>
      <div className="flex flex-col w-screen h-creen p-4 bg-[#1A1A1A]">
         {isConnected && (
            <div className="text-white">
                Hello World
            </div>
          )}
          <div>
            { 
              tvl.map(({item}, i: number) => (
                <TvlCard key={i} namePool={item.namePool} totalAmount={item.totalAmount} />
              ))
            }
          </div> 
      </div>
    </WagmiProvider>
  );
}

export default App;
