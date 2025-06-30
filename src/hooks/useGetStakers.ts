import { useReadContract, useChainId } from "wagmi"
import { MainnetABI } from '@/abi/mainnet'

export const useGetStakers = () => {
    const chainId = useChainId()

    const { data: totalStakers, isPending, error } = useReadContract({
        abi: MainnetABI.abi,
        address: MainnetABI.address,
        functionName: "investHolders",
        chainId: chainId,
    });

    return {
        totalStakers: totalStakers ? totalStakers : 0,
        isPending,
        error
    }
}