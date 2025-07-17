import { TCard } from '../../types'
import { Spinner } from "flowbite-react";
import { EthIcon, BnbIcon, SonicIcon } from './Icons';
import { calcToUsd } from '@/utils/helpers';

export const TvlCard = ({ namePool, totalAmount, isLoading, usdPrice, totalInvested }: TCard) => {

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

  const amountUsd = calcToUsd(totalInvested, usdPrice).toFixed(2)

  return (
    <div className="flex flex-col w-full md:w-72 h-auto justify-center items-center p-5 rounded-md bg-[#2C2C2C] space-y-2">
      <div className='flex w-full flex-row'>
        <div className='flex w-1/2 h-full p-5 items-center justify-start '>
          <Icon />
        </div>
        <div className='flex w-1/2 flex-col space-y-1 justify-end items-end p-2'>
          <p>{namePool}</p>
          {isLoading ? (<Spinner />) : (<p className='text-sm w-full text-right' >{totalAmount.toFixed(2)}{' ' + symbol}</p>)}
          <p className='text-sm text-right w-full'>${isNaN(parseFloat(usdPrice.toFixed(2))) ? 0 : usdPrice.toFixed(2)}</p>
        </div>
      </div>
      <div className='flex flex-row w-full border-t-2 pt-2'>
        <div className='flex w-1/2'>
          <p className='text-xs'>Your Invested Amount</p>
        </div>
        <div className='flex w-1/2 space-x-2 justify-end'>
          <p className='text-xs'>{totalInvested ? totalInvested.toFixed(3) : 0}</p>
          <p className='text-xs'>{symbol}</p>

        </div>
      </div>
      <div className='flex w-full items-end'>
        <p className='w-full text-xs text-right'>${!isNaN(parseFloat(amountUsd)) ? parseFloat(amountUsd).toFixed(2) : 0.00}</p>
      </div>
    </div>
  );
}
