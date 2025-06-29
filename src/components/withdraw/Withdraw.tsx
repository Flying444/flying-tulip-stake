import React, { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { FaEthereum } from "react-icons/fa";
import { Label } from "flowbite-react";
import { SiBinance } from "react-icons/si";
import { useChainId, useAccount } from "wagmi";

export const Withdraw = () => {
    const [balance, setBalance] = useState<bigint | number>(0)
    const [amount, setAmount] = useState<bigint | number >(0)
    const [validation, setValidation] = useState(true)
    const [sym, setSym] = useState('ETH')
    const successWithdraw = () => toast.success("Transaction success");
    const errorAmount = () => toast.error("Cannot withdraw that amount!");
    const chainId = useChainId()
    const { isConnected } = useAccount()

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
        if(amount === undefined || amount === null || !amount){
            setAmount(0)
        }
    },[amount])

    const handleWithdraw = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if(amount > 0 && amount <= balance){
            successWithdraw()
        }else{
            errorAmount();
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(parseInt(e.target.value))
    
         setValidation(amount >= balance ? false : true)
        
    }

    return (
        <div className="flex flex-col w-full space-y-4 rounded-xl p-5">
            <div className="flex w-full flex-col py-10 bg-[#222222] p-5 rounded-xl space-y-5 shadow">
                <div className="flex flex-row font-bold w-full">
                    <div className="flex flex-col w-1/2 justify-center text-center">
                        <p>Available: </p>
                        <h3>
                            {balance}
                        </h3>
                    </div>
                    <div className="flex flex-col w-1/2 items-right justify-center text-center">
                        <div className="flex flex-row space-x-2 w-full justify-center items-center">
                            {chainId === 56 ? (<SiBinance size={30} />) : (<FaEthereum size={30} />)}
                            <p>{sym}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full ">
                    <div className="mb-2 block text-left">
                        <Label htmlFor="input-gray" color="gray" className="text-left">
                            Withdraw amount 
                        </Label>
                    </div>
                    <label htmlFor="" className="hover:cursor-pointer text-right" onClick={() => {setAmount(balance) }}>max: {balance}</label>
                    <input type="text" id="error" value={amount.toString()} onChange={handleChange} className=" border  text-sm rounded-lg dark:bg-gray-700 focus:border-red-500 block w-full p-2.5" placeholder=""/>
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500" hidden={validation}><span className="font-medium"></span>Amount greater than balance</p>
                </div>

            </div>
            {isConnected && <button type="button" onClick={handleWithdraw} className="text-[#1A1A1A] bg-[#F5F57A] w-full hover:cursor-pointer focus:outline-none focus:ring-4 focus:ring-yellow-300 font-bold rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2">Withdraw</button>}
            <ToastContainer position="top-center"  />
        </div>
    )
}