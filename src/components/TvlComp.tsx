import { useEffect, useState, useContext } from "react"
import { TvlCard } from "./ui/TvlCard"
import { bsc, mainnet, sonic } from 'wagmi/chains'
import { TCard } from "@/types"
import { useTvl } from "@/hooks/useTvl"
import { useGetSoloPool } from "@/hooks/useGetSoloPool";
import { ContextPrices } from '@/context/ContextProvider'
import { calcToUsd } from "@/utils/helpers";

export const TvlComp = () => {
    const { ethPrice, bnbPrice, sPrice } = useContext(ContextPrices);

    const [tvl, setTvl] = useState<TCard[]>([
        { namePool: "Mainnet", totalAmount: 0, usdPrice: 0 },
        { namePool: "Solo Staking", totalAmount: 0, usdPrice: 0 },
        { namePool: "BSC", totalAmount: 0, usdPrice: 0 },
        { namePool: "Sonic", totalAmount: 0, usdPrice: 0 }])

    const totalEth = useTvl(mainnet.id)
    const totalBnb = useTvl(bsc.id)
    const totalS = useTvl(sonic.id)
    const totalSolo = useGetSoloPool();

    useEffect(() => {

        const ether = calcToUsd(totalEth.total, ethPrice)
        const bnb = calcToUsd(totalBnb.total, bnbPrice)
        const solo = calcToUsd(totalSolo.total, ethPrice)
        const totalson = calcToUsd(totalS.total, sPrice)

        setTvl([
            { namePool: "Mainnet", totalAmount: totalEth.total, usdPrice: ether },
            { namePool: "Solo Staking", totalAmount: totalSolo.total, usdPrice: solo },
            { namePool: "BSC", totalAmount: totalBnb.total, usdPrice: bnb },
            { namePool: "Sonic", totalAmount: totalS.total, usdPrice: totalson }
        ])


    }, [])




    return (
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full justify-center items-center  md:space-x-6 p-2 md:p-4">
            {
                tvl.map((item, i) => (
                    <TvlCard key={i} namePool={item.namePool} totalAmount={item.totalAmount} isLoading={totalEth.isPending} usdPrice={item.usdPrice} />
                ))
            }
        </div>

    )
} 