import { useReadContract, useChainId } from "wagmi"
import { MainnetABI } from '@/abi/mainnet'
import { formatEther } from "viem";

export const useGetRewards = () => {
    const chainId = useChainId()

    const { data: totalReward, isPending, error } = useReadContract({
        abi: MainnetABI.abi,
        address: MainnetABI.address,
        functionName: "totalReward",
        chainId: chainId,
    });


    return {
        totalReward: totalReward !== undefined && totalReward !== null ? formatEther(totalReward as bigint) : 0n,
        isPending,
        error
    }
}