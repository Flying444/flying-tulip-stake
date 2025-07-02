import { TCard } from '../../types'
import { Spinner } from "flowbite-react";
import { EthIcon, BnbIcon, SonicIcon } from './Icons';

export const TvlCard = ({ namePool, totalAmount, isLoading, usdPrice }: TCard) => {
  
  let Icon = EthIcon
  let symbol: string = 'eth'
  
  switch (namePool) {
    case "Sonic":
      symbol = 'S'
      Icon = SonicIcon
      break;
    case "BSC":
      symbol = 'BNB'
      Icon = BnbIcon
      break;
    default:
      symbol = 'ETH'
      break;
  }

  return (
    <div className="flex flex-col w-full md:w-72 h-auto justify-center items-center p-5 rounded-md bg-[#2C2C2C] space-y-2">
      <div className='flex w-full flex-row'>
        <div className='flex w-1/2 h-full p-5 items-center justify-start '>
          <Icon />
        </div>
        <div className='flex w-1/2 flex-col space-y-3 justify-end items-center p-2'>
          <p>{namePool}</p>
          {isLoading ? (<Spinner />) : (<p className='text-sm' >{totalAmount.toFixed(4)}{' ' + symbol}</p>)}
        </div>
      </div>
      <div className='flex flex-row w-full border-t-2 pt-2'>
        <div className='flex w-1/2'>
          <p className='text-xs'>Your Invested Amount</p>
        </div>
        <div className='flex w-1/2 space-x-2 justify-end'>
          <p className='text-xs'>0</p>
          <p className='text-xs'>{symbol}</p>
           
        </div>
      </div>
      <div className='flex w-full items-end'>
          <p className='w-full text-xs text-right'>${usdPrice}</p>
        </div>
    </div>
  );
}
