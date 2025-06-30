import { useAccount } from "wagmi";
import { Hero } from "./components/Hero";
import { Navigation } from "./components/Navigation";
import { Navmenu } from "./components/NavMenu";
import { ConnectButton } from '@rainbow-me/rainbowkit';

function App() {
  const { isConnected } = useAccount()
  // const chainId = useChainId()
  /*  const [userStats, setUserStats] = useState({ deposited: 0, earned: 0 })
   const time = 3 * 60 * 60 * 1000;
   const SONIC_POOL = "0x..."; */

   //const totalBnb = useTvl(BNB_POOL, bsc.id)

  return (

    <div className="flex flex-col w-full pb-10 items-center bg-[#1A1A1A] text-white">
      <Navigation />
      <Hero />
      <div className="flex flex-col w-full md:w-1/2 h-auto md:mt-10 border-gray-700 items-center border-2 rounded-3xl py-4">
        <div className="w-full text-center">
          <h1 className="text-2xl font-extrabold italic">STAKE</h1>
        </div>
        <div className="flex flex-col space-y-4 w-full justify-center items-center  p-4">
          <Navmenu />
        </div>
        {!isConnected && (<ConnectButton label={"Connect Wallet"} />)}
        
      </div>
    </div>
  );
}

export default App;
