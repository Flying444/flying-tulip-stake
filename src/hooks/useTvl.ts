import { useReadContract } from "wagmi"
import { formatEther } from "viem";
import { MainnetABI } from '@/abi/mainnet'
import { BscABI } from "@/abi/bsc";
import { SonicAbi } from "@/abi/sonic";

export const useTvl = (chainId: number) => {

  const useAbi = chainId === 1 ? MainnetABI : chainId === 56 ? BscABI : SonicAbi
 
  const { data: totalTvl, isPending, error } = useReadContract({
    abi: useAbi.abi,
    address: useAbi.address,
    functionName: "totalInvested",
    chainId: chainId,
  });

  const total = totalTvl !== undefined && totalTvl !== null ? formatEther(totalTvl as bigint) : '0'

  return {
    total: parseFloat(total),
    isPending,
    error
  }
} 