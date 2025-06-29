import { useReadContract } from "wagmi"
import {MainnetABI} from '@/abi/mainnet'


export const useTvl = (contractAddress: `0x${string}`) => {
  console.log('contract: ', contractAddress)
    const { data: totalInvested, error, isLoading } = useReadContract({
        ...MainnetABI,
        address: contractAddress,
        functionName: "owner",
        chainId: 1
    });

    console.log('data: ' + totalInvested, error, isLoading);
    return {
      
    totalInvested: totalInvested ? totalInvested : 0n,
   
     isLoading,
    error,}
    /* 
    totalReward: data ? data[1] : 0n,
    totalWithdrawed: data ? data[2] : 0n,
    totalETHPool: data ? data[3] : 0n,
    totalSoloPool: data ? data[4] : 0n,
  }; */
} 