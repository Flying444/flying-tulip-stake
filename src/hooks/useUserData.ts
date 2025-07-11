import { useReadContract } from "wagmi"
import { MainnetABI } from '@/abi/mainnet'
import { BscABI } from "@/abi/bsc";
import { SonicAbi } from "@/abi/sonic";

export const useGetUserData = (chainId: number, userAddress: `0x${string}`) => {

    const useAbi = chainId === 1 ? MainnetABI : chainId === 56 ? BscABI : SonicAbi

    const { data: totals, isPending, error, refetch } = useReadContract({
        abi: useAbi.abi,
        address: useAbi.address,
        functionName: "userInfo",
        args: [userAddress],
        chainId: chainId,
    });


    return {
        totals: totals ? totals : '0',
        isPending,
        error,
        refetch
    }


}