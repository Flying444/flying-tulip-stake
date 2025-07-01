import { useEffect, useState } from "react"
import { useChainId } from "wagmi";
import { TvlCard } from "./ui/TvlCard"
import { bsc, mainnet, sonic } from 'wagmi/chains'
import { TCard } from "@/types"
import { useTvl } from "@/hooks/useTvl"

export const TvlComp = () => {
    const chainId = useChainId()
    const [tvl, setTvl] = useState<TCard[]>([{ namePool: "Mainnet", totalAmount: 0n }, { namePool: "BSC", totalAmount: 0n }, { namePool: "Sonic", totalAmount: 0n }])

//  const time = 3 * 60 * 60 * 1000;
    const totalEth = useTvl(mainnet.id)
    const totalBnb = useTvl(bsc.id)
    const totalS = useTvl(sonic.id)
    console.log(totalEth.error)
    useEffect(() => {

        setTvl([
            { namePool: "Mainnet", totalAmount: totalEth.total },
            { namePool: "BSC", totalAmount: totalBnb.total },
            { namePool: "Sonic", totalAmount: totalS.total }
        ])
    }, [chainId])

    return (
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full justify-center items-center  md:space-x-6 p-2 md:p-4">
            {
                tvl.map((item, i) => (
                    <TvlCard key={i} namePool={item.namePool} totalAmount={item.totalAmount} isLoading={totalEth.isPending}/>
                ))
            }
        </div>

    )
} 