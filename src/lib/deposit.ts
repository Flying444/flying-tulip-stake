/* import { useWaitForTransactionReceipt, useWriteContract } from "wagmi"
import { parseEther } from "viem"
import { MainnetABI } from "@/abi/mainnet"
import { TDeposit } from '@/types'
import { BscABI } from "@/abi/bsc"
import { SonicAbi } from "@/abi/sonic"

export const deposit = async ({ chainId, amount }: TDeposit) => {
    const useABI = chainId === 1 ? MainnetABI : chainId === 56 ? BscABI : SonicAbi
    const { data: hash, writeContract } = useWriteContract()

    try {
        writeContract({
            abi: useABI.abi,
            address: useABI.address,
            functionName: 'deposit',
            value: parseEther(amount)
        })

    } catch (error) {
        console.log(error)
    }


    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })

    return {
        isConfirming,
        isConfirmed,
        hash
    }
}  */