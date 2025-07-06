import React, { useState, useEffect, useContext } from "react"
import { useChainId, useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { genRandomUser } from "@/utils/helpers"
import { ContextPrices } from "@/context/ContextProvider";
import { toast } from 'react-toastify';
import { minMax } from "@/utils/constants";
import { useGetStakers } from "@/hooks/useGetStakers";
//import { useGetStaked } from "@/hooks/useGetStaked";
import { useGetRewards } from "@/hooks/useGetRewards";
import { calcProjection } from "@/utils/helpers";
import { Aprs } from "@/utils/constants";
import { LuUsers } from "react-icons/lu";
//import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { LiaTrophySolid } from "react-icons/lia";
import { Spinner } from "flowbite-react";
import { EthIcon, BnbIcon, SonicIcon } from '@/components/ui/Icons';
import { MainnetABI } from "@/abi/mainnet"
import { BscABI } from "@/abi/bsc";
import { SonicAbi } from "@/abi/sonic";
import { parseEther } from "viem";
import { SETH } from "@/utils/constants";

type AprsKey = keyof typeof Aprs;

export const Deposit = () => {
    const chainId = useChainId()
    const { isConnected } = useAccount()
    const [range, setRange] = useState({ min: minMax.eth.min, max: minMax.eth.max });
    const [valueRange, setValueRange] = useState<number>(minMax.eth.min)
    const [calc, setCalc] = useState(0.00)
    const [projection, setProjection] = useState(1.87)
    const [sym, setSym] = useState<string>('ETH')
    const [apr, setapr] = useState<AprsKey>(1)
    const [soloEth, setSoloEth] = useState(false)
    const { totalStakers: stakers, isPending: isLoadingStakers } = useGetStakers()
   // const { totalStaked: staked, isPending: isLoadingStaked } = useGetStaked()
    const { totalReward: reward, isPending: isLoadingReward } = useGetRewards()

    const [addStake, setAddStaker] = useState(0)

    const { data: hash, writeContract } = useWriteContract()

    const { prices, currentTime } = useContext(ContextPrices)
    const { bnbPrice, ethPrice, sPrice } = prices
    const successDeposit = (msg: string) => toast.success(msg);
    const errorDeposit = (msg: string) => toast.error(msg);

    const iconSize = 30
    let actualPrice: number = ethPrice

    console.log(calc)

    useEffect(() => {
        let newMin: number = soloEth ? minMax.seth.min : minMax.eth.min;
        let newMax: number = soloEth ? minMax.seth.max : minMax.eth.max;
        let newSym = 'ETH';
        if (soloEth && chainId !== 1) setSoloEth(false)
        actualPrice = chainId === 1 ? ethPrice : chainId === 56 ? bnbPrice : sPrice
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

        const ran = soloEth && chainId === 1 ? Aprs[apr].min : SETH.min
        const { minGain } = calcProjection(newMin, ran, Aprs[apr].max)
        setRange({ min: newMin, max: newMax });
        setProjection(minGain)
        setCalc(minGain * actualPrice)
        setValueRange(newMin);
        setSym(newSym);
    }, [chainId])

    useEffect(() => {
        if (chainId === 1) {
            const newMin: number = soloEth ? minMax.seth.min : minMax.eth.min;
            const newMax: number = soloEth && chainId === 1 ? minMax.seth.max : minMax.eth.max;
            const { minGain } = calcProjection(newMin, SETH.min, SETH.max)

            setRange({ min: newMin, max: newMax });
            setProjection(minGain)
            setCalc(minGain * actualPrice)
            setValueRange(newMin);
        }
    }, [soloEth])


    if(currentTime.hours <= 0 ){
        const tot = parseFloat(stakers.toString()) + genRandomUser()
        setAddStaker(tot)
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setValueRange(value)

        console.log(valueRange)
        const { minGain } = calcProjection(value, soloEth ? SETH.min : Aprs[apr].min, soloEth ? SETH.min : Aprs[apr].max)
        const proj = minGain
        setProjection(proj)
        const calculation = minGain * actualPrice
        if (isNaN(calculation)) {
            setCalc(0);
        }
        setCalc(calculation)

        if (isNaN(value)) {
            setValueRange(0.0);
        }
    }

    function Submit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        const contractAddress = chainId === 1 ? MainnetABI.address : chainId === 56 ? BscABI.address : SonicAbi.address
        const amount = parseEther(valueRange.toString())
        try {

            writeContract({
                abi: MainnetABI.abi,
                address: contractAddress,
                functionName: 'deposit',
                args: [],
                value: amount,
                chainId: chainId
            })


        } catch (error) {
            console.log(error)
            errorDeposit('Your transaction could not be processed. Check your internet conenction and Try again later')

        }


    }

    const handleBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSoloEth(e.target.checked)
    }

    const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueRange(parseFloat(e.target.value))
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
                    {isLoadingStakers ? (<Spinner />) : (<p>{addStake}</p>)}
                    <p>Total Stakers</p>
                </div>
               {/*  <div className="flex flex-col bg-[#2C2C2C] w-auto space-y-2 justify-center items-center rounded-xl p-5 shadow">
                    < LiaMoneyBillWaveSolid size={iconSize} />
                    {isLoadingStaked ? (<Spinner />) : (<p>{parseFloat(staked).toFixed(4)}</p>)}
                    <p>Total Staked</p>
                </div> */}
                <div className="flex flex-col bg-[#2C2C2C] w-auto space-y-2 justify-center items-center rounded-xl p-5 shadow">
                    < LiaTrophySolid size={iconSize} />
                    {isLoadingReward ? (<Spinner />) : (<p>{parseFloat(reward).toFixed(4)}</p>)}
                    <p>Rewards paid</p>
                </div>


            </div>
            <div className="flex flex-row w-full space-x-4 p-2">
                <div className="flex flex-col bg-[#2C2C2C] w-1/2 justify-center items-center rounded-xl p-5 shadow">
                    <p>APR </p>
                    <p>{soloEth ? SETH.min : Aprs[apr].min}%</p>
                </div>
                <div className="flex flex-col bg-[#2C2C2C] w-1/2 justify-center items-center rounded-xl p-5 shadow">
                    <p className="text-sm text-center">Project annual reward</p>
                    <div className="flex w-full space-x-3 justify-center items-center">
                        {chainId === 1 ? (<EthIcon />) : chainId === 56 ? (<BnbIcon />) : (<SonicIcon />)}
                        <p className="">{projection.toFixed(3)}</p>
                        <p> {' '} {sym}</p>
                    </div>
                </div>
            </div>
            <form className="flex w-full flex-col py-10 bg-[#2C2C2C] p-3 rounded-xl space-y-5 shadow">
                {
                    chainId === 1 && (
                        <div className="flex w-full items-end justify-end">
                            <input id="checkedSoloEth" checked={soloEth} type="checkbox" value='' onChange={handleBox} className="w-4 h-4 text-red-200 bg-gray-100 border-gray-300 rounded-sm dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium  ">Solo Staking</label>
                        </div>
                    )
                }
                <div className="flex w-full flex-col  ">
                    <div className="flex flex-row justify-center font-bold w-full">

                        <div className="flex flex-col w-1/2 items-right justify-center text-left">
                            <div className="flex w-full justify-center items-center">
                                {chainId === 1 ? (<EthIcon />) : chainId === 56 ? (<BnbIcon />) : (<SonicIcon />)}
                                <p>{sym}</p>
                            </div>
                        </div>
                        <div className="flex w-1/2 justify-center items-center ">
                            <h3>
                                <input type="number" name="" id="" className="border-none focus:outline-none  text-right" value={valueRange} onChange={handleOnChange} />
                            </h3>
                        </div>
                    </div>
                    <div className="flex flex-col w-full p-3">
                        {(chainId === 1 && soloEth) ? (
                            <div className="flex flex-col space-y-2">
                                <div className="flex items-center ps-4 border border-gray-200 rounded-sm dark:border-gray-700">
                                    <input id="red-radio" checked={valueRange === minMax.seth.min} onChange={handleRadio} style={{ transform: 'scale(1.3)' }} type="radio" value={minMax.seth.min} name="colored-radio" className="w-4 h-4  bg-gray-100 border-gray-300 " />
                                    <label htmlFor="bordered-checkbox-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">16</label>
                                </div>
                                <div className="flex items-center ps-4 border border-gray-200 rounded-sm dark:border-gray-700">
                                    <input checked={valueRange === minMax.seth.max} id="bordered-checkbox-2" onChange={handleRadio} style={{ transform: 'scale(1.3)' }} type="radio" value={minMax.seth.max} name="bordered-checkbox" className="w-4 h-4  bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500" />
                                    <label htmlFor="bordered-checkbox-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">32</label>
                                </div>
                            </div>
                        ) : (
                            <>
                                <input id="rangeId" type="range" step={chainId === 146 ? 500 : 0.5} min={range.min} max={range.max} value={valueRange} onChange={handleOnChange} className="w-full h-2 bg-gray-200 rounded-lg text-[#F5F57A] cursor-pointer dark:bg-gray-700" />
                                <div className="flex flex-row w-full content-between">
                                    <p className="w-1/2 text-left">{range.min}</p>
                                    <p className="w-1/2 text-right">{range.max}</p>
                                </div>
                            </>
                        )

                        }

                    </div>

                </div>
                {/* <div className="flex flex-row font-bold text-sm w-full">
                    <div className="w-1/2 text-left">
                        <p>You will receive: </p>
                    </div>
                    <div className="w-1/2 text-right">
                        <p><span className="font-bold">${calc.toFixed(2)}</span></p>
                    </div>
                </div> */}
                {isConnected && <button type="button" onClick={Submit} className="text-[#1A1A1A] bg-[#F5F57A] w-full hover:cursor-pointer focus:outline-none focus:ring-4 focus:ring-yellow-300 font-bold rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2">Stake</button>}
            </form>
        </div>
    )
}