import { useReadContract, useChainId } from "wagmi"
import { MainnetABI } from '@/abi/mainnet'
import { BscABI } from "@/abi/bsc";
import { SonicAbi } from "@/abi/sonic";
import { formatEther } from "viem";

export const useGetRewards = () => {
    const chainId = useChainId()
    const useAbi = chainId === 1 ? MainnetABI : chainId === 56 ? BscABI : SonicAbi

    const { data: totalReward, isPending, error } = useReadContract({
        abi: useAbi.abi,
        address: useAbi.address,
        functionName: "totalReward",
        chainId: chainId,
    });


    return {
        totalReward: totalReward !== undefined && totalReward !== null ? formatEther(totalReward as bigint) : '0.0',
        isPending,
        error
    }
}