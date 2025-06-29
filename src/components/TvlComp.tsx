import { TvlCard } from "./ui/TvlCard"
import { TCardComp } from "@/types"

export const TvlComp = ({tvl}: TCardComp) => {
    return (
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full justify-center items-center md:space-x-6 p-4">
            {
                tvl.map((item, i) => (
                    <TvlCard key={i} namePool={item.namePool} totalAmount={item.totalAmount} />
                ))
            }
        </div>

    )
} 