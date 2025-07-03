import { useEffect, useState, useContext } from "react"
import { TvlCard } from "./ui/TvlCard"
import { useAccount } from "wagmi"
import { bsc, mainnet, sonic } from 'wagmi/chains'
import { TCard } from "@/types"
import { useTvl } from "@/hooks/useTvl"
import { useGetUserData } from "@/hooks/useUserData"
import { useInterval } from "@/hooks/useInterval"
import { useGetSoloPool } from "@/hooks/useGetSoloPool";
import { ContextPrices } from '@/context/ContextProvider'
import { calcToUsd } from "@/utils/helpers";

export const TvlComp = () => {
    const {address} = useAccount();
    const { ethPrice, bnbPrice, sPrice } = useContext(ContextPrices)
    const THREE_HOURS_IN_MS = 3 * 60 * 60 * 1000

    const [tvl, setTvl] = useState<TCard[]>([
        { namePool: "Mainnet", totalAmount: 0, usdPrice: 0, totalInvested: 0 },
        { namePool: "Solo Staking", totalAmount: 0, usdPrice: 0, totalInvested: 0 },
        { namePool: "BSC", totalAmount: 0, usdPrice: 0, totalInvested: 0 },
        { namePool: "Sonic", totalAmount: 0, usdPrice: 0, totalInvested: 0 }])

    const totalEth = useTvl(mainnet.id)
    const totalBnb = useTvl(bsc.id)
    const totalS = useTvl(sonic.id)
    const totalSolo = useGetSoloPool();

    const totalInvEth = useGetUserData( mainnet.id, address ? address : '0x');
    const totalInvbnb = useGetUserData( bsc.id, address ? address : '0x');
    const totalInvs = useGetUserData( sonic.id, address ? address : '0x');

    useInterval(() => {
        totalEth.refetch()
        totalBnb.refetch()
        totalS.refetch()
        totalSolo.refetch()
        console.log('Refetching TVL data...');
    }, THREE_HOURS_IN_MS);

    useEffect(() => {

        const ether = calcToUsd(totalEth.total, ethPrice)
        const bnb = calcToUsd(totalBnb.total, bnbPrice)
        const solo = calcToUsd(totalSolo.total, ethPrice)
        const totalson = calcToUsd(totalS.total, sPrice)
        
        const ethInv = parseFloat(totalInvEth.totals[0] as string)
        const soloEthInv = parseFloat(totalInvEth.totals[1] as string)
        const bnbInv = parseFloat(totalInvbnb.totals[0] as string)
        const sInv = parseFloat(totalInvs.totals[0] as string)

        setTvl([
            { namePool: "Mainnet", totalAmount: totalEth.total, usdPrice: ether, totalInvested: ethInv },
            { namePool: "Solo Staking", totalAmount: totalSolo.total, usdPrice: solo, totalInvested: soloEthInv },
            { namePool: "BSC", totalAmount: totalBnb.total, usdPrice: bnb, totalInvested: bnbInv},
            { namePool: "Sonic", totalAmount: totalS.total, usdPrice: totalson, totalInvested: sInv }
        ])


    }, [ethPrice, bnbPrice, sPrice])




    return (
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full justify-center items-center  md:space-x-6 p-2 md:p-4">
            {
                tvl.map((item, i) => (
                    <TvlCard key={i} namePool={item.namePool} totalAmount={item.totalAmount} isLoading={totalEth.isPending} usdPrice={item.usdPrice} totalInvested={item.totalInvested} />
                ))
            }

        </div>

    )
} 