import React, { useState, useEffect } from "react"
import { useChainId, useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { toast } from 'react-toastify';
import { Label } from "flowbite-react";
import { EthIcon, BnbIcon, SonicIcon } from '@/components/ui/Icons';
import { MainnetABI } from "@/abi/mainnet"
import { BscABI } from "@/abi/bsc";
import { SonicAbi } from "@/abi/sonic";
import { parseEther } from "viem";

export const Withdraw = () => {
    const [balance, setBalance] = useState<bigint | number>(0)
    const [amount, setAmount] = useState<bigint | number>(0)
    const [validation, setValidation] = useState(true)
    const [sym, setSym] = useState('ETH')
    const chainId = useChainId()
    const { isConnected } = useAccount()
    const { data: hash, writeContract } = useWriteContract()
    const successWithdraw = (msg: string) => toast.success(msg);
    const errorAmount = (msg: string) => toast.error(msg);

    useEffect(() => {
        switch (chainId) {
            case 1:
                setSym('ETH')
                break;
            case 56:
                setSym('BNB')
                break;
            case 146:
                setSym('S')
                break;
        }
        setBalance(0)
        setAmount(0)
    }, [chainId])

    useEffect(() => {
        if (amount === undefined || amount === null || !amount) {
            setAmount(0)
        }
    }, [amount])

    function Submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const contractAddress = chainId === 1 ? MainnetABI.address : chainId === 56 ? BscABI.address : SonicAbi.address
        const value = parseEther(amount.toString())
        try {
            writeContract({
                abi: MainnetABI.abi,
                address: contractAddress,
                functionName: 'withdraw',
                args: [],
                value: value,
                chainId: chainId
            })

        } catch (error) {
            console.log(error)
            errorAmount('A problem happend, check your internet connection');
        }
        if (amount < 0 && amount >= balance) {
            errorAmount('Cannot withdraw that amount');
            return
        }

    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })

    if (!isConfirming && isConfirmed) successWithdraw('Deposit Successful')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(parseInt(e.target.value))

        setValidation(amount >= balance ? false : true)

    }

    return (
        <div className="flex flex-col w-100 items-center justify-center space-y-4 bg-[#1A1A1A] rounded-xl p-5 shadow">
            <div className="flex w-full flex-col  py-10 bg-[#222222] p-5 rounded-xl space-y-10 shadow">
                <div className="flex flex-col text-center items-center justify-center space-y-5 font-bold w-full">
                    <p>Available: </p>
                    <div className="flex flex-col w-1/2 justify-center text-center">
                        <h3>
                            {balance}
                        </h3>
                    </div>
                    <div className="flex flex-col w-1/2 items-right justify-center text-center">
                        <div className="flex flex-row space-x-2 w-full justify-center items-center">
                            {chainId === 1 ? (<EthIcon />) : chainId === 56 ? (<BnbIcon />) : (<SonicIcon />)}
                            <p>{sym}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full ">
                    <form onSubmit={Submit}>
                        <div className="flex flex-row place-content-between ">
                            <Label htmlFor="input-gray" color="gray" className="text-left">
                                Withdraw amount
                            </Label>
                            <label htmlFor="" className="hover:cursor-pointer text-right text-sm" onClick={() => { setAmount(balance) }}>max: {balance}</label>
                        </div>

                        <input type="text" value={amount.toString()} onChange={handleChange} className=" border  text-sm rounded-lg dark:bg-gray-700 focus:border-red-500 block w-full p-2.5" placeholder="" />
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500" hidden={validation}><span className="font-medium"></span>Amount greater than balance</p>
                    </form>
                </div>

            </div>
            {isConnected && <button type="button" className="text-[#1A1A1A] bg-[#F5F57A] w-full hover:cursor-pointer focus:outline-none focus:ring-4 focus:ring-yellow-300 font-bold rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2">Withdraw</button>}
        </div>
    )
}