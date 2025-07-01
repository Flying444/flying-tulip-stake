import { useState, useEffect } from "react"
import { useChainId, useAccount } from "wagmi";
import { minMax } from "@/utils/constants";
import { useGetStakers } from "@/hooks/useGetStakers";
import { useGetStaked } from "@/hooks/useGetStaked";
import { useGetRewards } from "@/hooks/useGetRewards";
import { LuUsers } from "react-icons/lu";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { LiaTrophySolid } from "react-icons/lia";
import { Spinner } from "flowbite-react";
import { EthIcon, BnbIcon, SonicIcon } from '@/components/ui/Icons';
//import { deposit } from "@/lib/deposit";

export const Deposit = () => {
    const chainId = useChainId()
    const { isConnected } = useAccount()
    const [range, setRange] = useState({ min: minMax.eth.min, max: minMax.eth.max });
    const [valueRange, setValueRange] = useState<string | number>(minMax.eth.min)
    const [calc, setCalc] = useState(0.00)
    const [projection, setProjection] = useState(0.0)
    const [sym, setSym] = useState('ETH')
    const { totalStakers, isPending: isLoadingStakers } = useGetStakers()
    const { totalStaked, isPending: isLoadingStaked } = useGetStaked()
    const { totalReward, isPending: isLoadingReward } = useGetRewards()

    const [amounts, setAmounts] = useState({
        stakers: totalStakers,
        staked: totalStaked,
        reward: totalReward
    })

    useEffect(() => {
        let newMin: string | number = minMax.eth.min;
        let newMax: string | number = minMax.eth.max;
        let newSym = 'ETH';
        console.log(newMin)
        switch (chainId) {
            case 1:
                newMin = minMax.eth.min;
                newMax = minMax.eth.max;
                newSym = 'ETH';
                break;
            case 56:
                newMin = minMax.bnb.min;
                newMax = minMax.bnb.max;
                newSym = 'BNB';
                break;
            case 146:
                newMin = minMax.s.min;
                newMax = minMax.s.max;
                newSym = 'S';
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

    const handleStake = async () => {
       // const {} = deposit(valueRange)
       alert('Deposit loading...')
    }

    return (
        <div className="flex flex-col items-center justify-center w-full space-y-4 bg-[#1A1A1A] rounded-xl p-5 shadow">
            <div className="flex flex-col w-full md:flex-row space-y-2 md:space-x-4 p-2">

                <div className="flex flex-col bg-[#222222] w-auto space-y-2 justify-center items-center rounded-xl p-5 shadow">
                    < LuUsers size={20} />
                    {isLoadingStakers ? (<Spinner />) : (<p>{amounts.stakers}</p>)}
                    <p>Total Stakers</p>
                </div>
                <div className="flex flex-col bg-[#222222] w-auto space-y-2 justify-center items-center rounded-xl p-5 shadow">
                    < LiaMoneyBillWaveSolid size={20} />
                    {isLoadingStaked ? (<Spinner />) : (<p>{amounts.staked}</p>)}
                    <p>Total Staked</p>
                </div>
                <div className="flex flex-col bg-[#222222] w-auto space-y-2 justify-center items-center rounded-xl p-5 shadow">
                    < LiaTrophySolid size={20} />
                    {isLoadingReward ? (<Spinner />) : (<p>{amounts.reward}</p>)}
                    <p>Rewards paid</p>
                </div>


            </div>
            <div className="flex flex-row w-full space-x-4 p-2">
                <div className="flex flex-col bg-[#222222] w-1/2 justify-center items-center rounded-xl p-5 shadow">
                    <p>APY </p>
                    <p>2.6%</p>
                </div>
                <div className="flex flex-col bg-[#222222] w-1/2 justify-center items-center rounded-xl p-5 shadow">
                    <p className="text-sm text-center">Project annual reward</p>
                    <div className="flex w-full space-x-3 justify-center items-center">
                        {chainId === 1 ? (<EthIcon />) : chainId === 56 ? (<BnbIcon />) : (<SonicIcon />)}
                        <p className="">{projection + ' '}</p>
                        <p> {' '} {sym}</p>
                    </div>
                </div>
            </div>
            <div className="flex w-full flex-col py-10 bg-[#222222] p-5 rounded-xl space-y-5 shadow">
                <div className="flex flex-row justify-center font-bold w-full">
                    
                    <div className="flex flex-col w-1/2 items-right justify-center text-center">
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
                <input id="rangeId" type="range" min={range.min} max={range.max} value={valueRange} onChange={() => handleOnChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
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
            {isConnected && <button type="button" onClick={handleStake} className="text-[#1A1A1A] bg-[#F5F57A] w-full hover:cursor-pointer focus:outline-none focus:ring-4 focus:ring-yellow-300 font-bold rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2">Stake</button>}
        </div>
    )
}