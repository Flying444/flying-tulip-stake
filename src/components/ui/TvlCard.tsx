import { FaEthereum } from "react-icons/fa";
import { SiBinance } from "react-icons/si";
import {TCard} from '../../types'
import { IconType } from 'react-icons/lib';
import { Spinner } from "flowbite-react";

export const TvlCard = ({ namePool, totalAmount, isLoading}: TCard) => {

  let Icon: IconType;
  let symbol: string;
  
  switch (namePool) {
    case "Sonic":
      Icon = FaEthereum;
      symbol = 'S'
      break;
    case "BSC": 
      Icon = SiBinance;
      symbol = 'BNB'
      break;
    default:
      Icon = FaEthereum;
      symbol='ETH'
      break;
  }

  return (
    <div className="flex flex-col w-auto items-center p-4 rounded-md bg-[#222222] space-y-2">
      <Icon size={40} />
      <p>{namePool}</p>
      <p>Total Locked Value</p>
      {isLoading ? (<Spinner />) : ( <p>{symbol + ' '}{totalAmount}</p>)}
    </div>
  );
}
