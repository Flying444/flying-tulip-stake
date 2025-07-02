import { useState, useEffect } from "react"
import { useChainId, useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { toast } from 'react-toastify';
import { minMax } from "@/utils/constants";
import { useGetStakers } from "@/hooks/useGetStakers";
import { useGetStaked } from "@/hooks/useGetStaked";
import { useGetRewards } from "@/hooks/useGetRewards";
import { Aprs } from "@/utils/constants";
import { LuUsers } from "react-icons/lu";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { LiaTrophySolid } from "react-icons/lia";
import { Spinner } from "flowbite-react";
import { EthIcon, BnbIcon, SonicIcon } from '@/components/ui/Icons';
import { MainnetABI } from "@/abi/mainnet"
import { BscABI } from "@/abi/bsc";
import { SonicAbi } from "@/abi/sonic";

type AprsKey = keyof typeof Aprs;

export const Deposit = () => {
    const chainId = useChainId()
    const { isConnected } = useAccount()
    const [range, setRange] = useState({ min: minMax.eth.min, max: minMax.eth.max });
    const [valueRange, setValueRange] = useState<number>(minMax.eth.min)
    const [calc, setCalc] = useState(0.00)
    const [projection, setProjection] = useState(0.0)
    const [sym, setSym] = useState<string>('ETH')
    const [apr, setapr] = useState<AprsKey>(1)
    const { totalStakers: stakers, isPending: isLoadingStakers } = useGetStakers()
    const { totalStaked: staked, isPending: isLoadingStaked } = useGetStaked()
    const { totalReward: reward, isPending: isLoadingReward } = useGetRewards()

    const { data: hash, writeContract } = useWriteContract()

    const successDeposit = (msg: string) => toast.success(msg);
    const errorDeposit = (msg: string) => toast.error(msg);

    const iconSize = 30

    useEffect(() => {
        let newMin: number = minMax.eth.min;
        let newMax: number = minMax.eth.max;
        let newSym = 'ETH';

        switch (chainId) {
            case 1:
                newMin = minMax.eth.min;
                newMax = minMax.eth.max;
                newSym = 'ETH';
                setapr(1)
                break;
            case 56:
                newMin = minMax.bnb.min;
                newMax = minMax.bnb.max;
                newSym = 'BNB';
                setapr(56);
                break;
            case 146:
                newMin = minMax.s.min;
                newMax = minMax.s.max;
                newSym = 'S';
                setapr(146);
                break;
        }
        setRange({ min: newMin, max: newMax });
        setValueRange(newMin);
        setSym(newSym);
        setCalc(0.00)
        setProjection(0)
    }, [chainId])


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueRange(parseFloat(e.target.value))
    }

    function Submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const contractAddress = chainId === 1 ? MainnetABI.address : chainId === 56 ? BscABI.address : SonicAbi.address
        try {
            writeContract({
                abi: MainnetABI.abi,
                address: contractAddress,
                functionName: 'deposit',
                value: BigInt(valueRange),
                chainId: chainId
            })


        } catch (error) {
            console.log(error)
            errorDeposit('Your transaction could not be processed. Check your internet conenction and Try again later')

        }


    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })

    if (!isConfirming && isConfirmed) successDeposit('Deposit Successful')

    return (
        <div className="flex flex-col items-center justify-center w-64 md:w-full space-y-4 bg-[#222222] rounded-xl p-5 shadow">
            <div className="flex flex-col w-full md:flex-row h-auto space-y-2 md:space-x-4 p-2">

                <div className="flex flex-col bg-[#2C2C2C] w-auto space-y-2 justify-center items-center rounded-xl p-5 shadow">
                    < LuUsers size={iconSize} />
                    {isLoadingStakers ? (<Spinner />) : (<p>{stakers}</p>)}
                    <p>Total Stakers</p>
                </div>
                <div className="flex flex-col bg-[#2C2C2C] w-auto space-y-2 justify-center items-center rounded-xl p-5 shadow">
                    < LiaMoneyBillWaveSolid size={iconSize} />
                    {isLoadingStaked ? (<Spinner />) : (<p>{parseFloat(staked).toFixed(4)}</p>)}
                    <p>Total Staked</p>
                </div>
                <div className="flex flex-col bg-[#2C2C2C] w-auto space-y-2 justify-center items-center rounded-xl p-5 shadow">
                    < LiaTrophySolid size={iconSize} />
                    {isLoadingReward ? (<Spinner />) : (<p>{parseFloat(reward).toFixed(4)}</p>)}
                    <p>Rewards paid</p>
                </div>


            </div>
            <div className="flex flex-row w-full space-x-4 p-2">
                <div className="flex flex-col bg-[#2C2C2C] w-1/2 justify-center items-center rounded-xl p-5 shadow">
                    <p>APR </p>
                    <p>{Aprs[apr].min}% ~ {Aprs[apr].max}%</p>
                </div>
                <div className="flex flex-col bg-[#2C2C2C] w-1/2 justify-center items-center rounded-xl p-5 shadow">
                    <p className="text-sm text-center">Project annual reward</p>
                    <div className="flex w-full space-x-3 justify-center items-center">
                        {chainId === 1 ? (<EthIcon />) : chainId === 56 ? (<BnbIcon />) : (<SonicIcon />)}
                        <p className="">{projection + ' '}</p>
                        <p> {' '} {sym}</p>
                    </div>
                </div>
            </div>
            <form onSubmit={Submit}>
                <div className="flex w-full flex-col py-10 bg-[#2C2C2C] p-3 rounded-xl space-y-5 shadow">
                    <div className="flex flex-row justify-center font-bold w-full">

                        <div className="flex flex-col w-1/2 items-right justify-center text-left">
                            <div className="flex w-full justify-center items-center">
                                {chainId === 1 ? (<EthIcon />) : chainId === 56 ? (<BnbIcon />) : (<SonicIcon />)}
                                <p>{sym}</p>
                            </div>
                        </div>
                        <div className="flex w-1/2 justify-center items-center text-center">
                            <h3>
                                {valueRange}
                            </h3>
                        </div>
                    </div>
                    <div className="flex flex-col w-full p-3">
                        <input id="rangeId" type="range" step={0.1} min={range.min} max={range.max} value={valueRange} onChange={handleOnChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                        <div className="flex flex-row w-full content-between">
                            <p className="w-1/2 text-left">{range.min}</p>
                            <p className="w-1/2 text-right">{range.max}</p>
                        </div>
                    </div>

                </div>
                <div className="flex flex-row font-bold text-sm w-full">
                    <div className="w-1/2 text-left">
                        <p>You will receive: </p>
                    </div>
                    <div className="w-1/2 text-right">
                        <p><span className="font-bold">{calc} {sym}</span></p>
                        <p><span className="font-bold">$0</span></p>
                    </div>
                </div>
                {isConnected && <button type="button" className="text-[#1A1A1A] bg-[#F5F57A] w-full hover:cursor-pointer focus:outline-none focus:ring-4 focus:ring-yellow-300 font-bold rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2">Stake</button>}
            </form>
        </div>
    )
}