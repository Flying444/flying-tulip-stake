import { useContext } from "react";
import { useAccount } from "wagmi";
import { ContextPrices } from "@/context/ContextProvider";
import { Navigation } from "./components/Navigation";
import { ToastContainer } from 'react-toastify';
import { Navmenu } from "./components/NavMenu";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { TvlComp } from "@/components/TvlComp";

function App() {
  const { isConnected } = useAccount()
  const { currentTime } = useContext(ContextPrices)
  return (
    <div className="flex flex-col w-full pb-10 items-center bg-[#1A1A1A] text-white">
      <Navigation />
      <div className="flex justify-center items-center w-full p-3">
        {currentTime.hours.toString().padStart(2, '0')}:
        {currentTime.minutes.toString().padStart(2, '0')}:
        {currentTime.seconds.toString().padStart(2, '0')}
      </div>
      <div className="">
        <TvlComp />
      </div>

      <div className="flex flex-col w-full md:mt-10  items-center rounded-3xl py-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 w-full justify-center items-center">
          <Navmenu />
        </div>
        {!isConnected && (<ConnectButton label={"Connect Wallet"} />)}

      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
