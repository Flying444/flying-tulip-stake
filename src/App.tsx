import { useAccount } from "wagmi";
import { Navigation } from "./components/Navigation";
import { Navmenu } from "./components/NavMenu";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { TvlComp } from "@/components/TvlComp";
//import { useEffect, useState } from "react";

function App() {
  const { isConnected } = useAccount()
 /*  const [prices, setPrices] = useState({
    eth: 0,
    bnb: 0,
    s: 0
  }) */


 /*  useEffect(() => {
    const getPrices = async () => {
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,binancecoin,sonic&vs_currencies=usd');
      if (res) {
        setPrices({
          eth: 0,
          bnb: 0,
          s: 0
        })
        console.log(prices)
      }
    }
    //getPrices()
  }, []) */

  return (
    <div className="flex flex-col w-full pb-10 items-center bg-[#1A1A1A] text-white">
      <Navigation />
      <div className="">
        <TvlComp />
      </div>

      <div className="flex flex-col w-full  h-auto md:mt-10  items-center rounded-3xl py-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 w-full justify-center items-center  p-4">
          <Navmenu />
        </div>
        {!isConnected && (<ConnectButton label={"Connect Wallet"} />)}

      </div>
    </div>
  );
}

export default App;
