import { useReadContract } from "wagmi"
import { formatEther } from "viem";
import { MainnetABI } from '@/abi/mainnet'

export const useTvl = (chainId: number) => {
  const {data: totalTvl, isPending, error} = useReadContract({
    abi: MainnetABI.abi,
    address: MainnetABI.address,
    functionName: "totalInvested",
    chainId: chainId,
  });
  
  const total = totalTvl !== undefined && totalTvl !== null ? formatEther(totalTvl as bigint) : 0n 
  return {
    total: total,
    isPending,
    error
  }
} 