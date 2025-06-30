import { useState, useEffect } from "react"
import { useChainId, useAccount } from "wagmi";
import { RangeSlider } from "flowbite-react";
import { FaEthereum } from "react-icons/fa";
import { SiBinance } from "react-icons/si";
import { minMax } from "@/utils/constants";
import { useGetStakers } from "@/hooks/useGetStakers";
import { useGetStaked } from "@/hooks/useGetStaked";
import { useGetRewards } from "@/hooks/useGetRewards";
import { LuUsers } from "react-icons/lu";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { LiaTrophySolid } from "react-icons/lia";
import { Spinner } from "flowbite-react";

export const Deposit = () => {
    const chainId = useChainId()
    const { isConnected } = useAccount()
    const [range, setRange] = useState({ min: minMax.eth.min, max: minMax.eth.max });
    const [valueRange, setValueRange] = useState(minMax.eth.min)
    const [calc, setCalc] = useState(0.00)
    const [projection, setProjection] = useState(0.0)
    const [sym, setSym] = useState('ETH')

    const {totalStakers, isPending} = useGetStakers()
    const {totalStaked} = useGetStaked()
    const {totalReward, error} = useGetRewards()
    console.log(error)
    const [amounts, setAmounts ] = useState({
        stakers: totalStakers,
        staked: totalStaked,
        reward: totalReward
    })
 
    useEffect(() => {
        switch (chainId) {
            case 1:
                setRange({ min: minMax.eth.min, max: minMax.eth.max })
                setSym('ETH')
                break;
            case 56:
                setRange({ min: minMax.bnb.min, max: minMax.bnb.max })
                setSym('BNB')
                break;
            case 146:
                setRange({ min: minMax.s.min, max: minMax.s.max })
                setSym('S')
                break;
        }
        setCalc(0.00)
        setProjection(0)
        setAmounts({
        stakers: totalStakers,
        staked: totalStaked,
        reward: totalReward
    })
    }, [chainId])


    const handleOnChange = (e: HTMLInputElement) => {
        setValueRange(e.value)
    }

    const handleStake = async () => {

    }

    return (
        <div className="flex flex-col w-full space-y-4 bg-[#1A1A1A] rounded-xl p-5">
            <div className="flex flex-row space-x-4 p-2">

                <div className="flex flex-col bg-[#222222] w-auto space-y-2 justify-center items-center rounded-xl p-5">
                    < LuUsers size={20} />
                   { isPending ? (<Spinner />) : ( <p>{amounts.stakers}</p>)}
                    <p>Total Stakers</p>
                </div>
                <div className="flex flex-col bg-[#222222] w-auto space-y-2 justify-center items-center rounded-xl p-5">
                    < LiaMoneyBillWaveSolid size={20} />
                     { isPending ? (<Spinner />) : (<p>{amounts.staked}</p>)}
                    <p>Total Staked</p>
                </div>
                <div className="flex flex-col bg-[#222222] w-auto space-y-2 justify-center items-center rounded-xl p-5">
                    < LiaTrophySolid size={20} />
                     { isPending ? (<Spinner />) : (<p>{amounts.reward}</p>)}
                    <p>Rewards paid</p>
                </div>


            </div>
            <div className="flex flex-row w-full space-x-4 p-4">
                <div className="flex flex-col bg-[#222222] w-1/2 justify-center items-center rounded-xl p-5">
                    <p>APY </p>
                    <p>2.6%</p>
                </div>
                <div className="flex flex-col bg-[#222222] w-1/2 justify-center items-center rounded-xl p-5">
                    <p className="text-sm">Project annual reward</p>
                    <div className="flex w-full space-x-2 justify-center items-center">
                        {chainId === 56 ? (<SiBinance size={30} />) : (<FaEthereum size={30} />)}
                        {projection}
                        <p> {' ' } {sym}</p>
                    </div>
                </div>
            </div>
            <div className="flex w-full flex-col py-10 bg-[#222222] p-5 rounded-xl space-y-5 shadow">
                <div className="flex flex-row font-bold w-full">
                    <div className="flex w-1/2 justify-center text-center">
                        <h3>
                            {valueRange}
                        </h3>
                    </div>
                    <div className="flex flex-col w-1/2 items-right justify-center text-center">
                        <div className="flex w-full justify-center items-center">
                            {chainId === 56 ? (<SiBinance size={30} />) : (<FaEthereum size={30} />)}
                            <p>{sym}</p>
                        </div>


                    </div>
                </div>
                <RangeSlider id={valueRange} className="text-[#F5F57A] ring-[#F5F57A] " min={range.min} max={range.max} value={valueRange} sizing="md" onChange={() => handleOnChange} />
            </div>
            <div className="flex flex-row font-bold text-sm w-full">
                <div className="w-1/2 text-left">
                    <p>You will receive: </p>
                </div>
                <div className="w-1/2 text-right">
                    <p><span className="font-bold">{calc} {sym}</span></p>
                </div>
            </div>
            {isConnected && <button type="button" onClick={handleStake} className="text-[#1A1A1A] bg-[#F5F57A] w-full hover:cursor-pointer focus:outline-none focus:ring-4 focus:ring-yellow-300 font-bold rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2">Stake</button>}
        </div>
    )
}