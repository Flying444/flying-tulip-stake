import { useReadContract, useChainId } from "wagmi"
import { MainnetABI } from '@/abi/mainnet'
import { formatEther } from "viem";

export const useGetStaked = () => {
    const chainId = useChainId()

    const { data: totalStaked, isPending, error } = useReadContract({
        abi: MainnetABI.abi,
        address: MainnetABI.address,
        functionName: "totalInvested",
        chainId: chainId,
    });


    return {
        totalStaked: totalStaked !== undefined && totalStaked !== null ? formatEther(totalStaked as bigint) : '0.0',
        isPending,
        error
    }
}