import {
    createContext,
    ReactNode,
    useEffect,
    useState,
} from "react";
import axios from "axios";
import { useInterval } from "@/hooks/useInterval";

type TContextPrices = {
    ethPrice: number;
    bnbPrice: number;
    sPrice: number;
};


type TData = {
    totalEth: number;
    totalBnb: number;
    totalS: number;
    totalStakersEth: number;
    totalStakersBnb: number;
    totalStakersS: number;
}

type TGlobal = {
    prices: TContextPrices;
    currentTotals: TData;
}

const initVal = {
    ethPrice: 0,
    bnbPrice: 0,
    sPrice: 0,
}

const initTotals = {
    totalEth: 0, totalBnb: 0, totalS: 0, totalStakersEth: 0, totalStakersBnb: 0, totalStakersS: 0
}


export const ContextPrices = createContext<TGlobal>({
    prices: initVal,
    currentTotals: initTotals
});

const apiPools = import.meta.env.VITE_API_POOLS

export function ContextPricesProvider({ children }: { children: ReactNode }) {
    const [prices, setPrices] = useState<TContextPrices>(initVal);
    const [currentTotals, setCurrentTotals] = useState<TData>(initTotals)

    const getTotals = async () => {
        try {
            const res = await axios.get(apiPools)
            const data = res.data
            if (data) {
                setCurrentTotals({
                    totalEth: data['totalEth'],
                    totalBnb: data['totalBnb'],
                    totalS: data['totalS'],
                    totalStakersEth: data['totalStakersEth'],
                    totalStakersBnb: data['totalStakersBnb'],
                    totalStakersS: data['totalStakersS']
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

       useInterval(() => {
           getTotals()
        }, 2000);


    const getUsdPrices = async () => {
        try {
            const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,binancecoin,sonic-3&vs_currencies=usd');
            const data = res.data
            console.log('fetching')
            setPrices({
                ethPrice: data['ethereum'].usd,
                bnbPrice: data['binancecoin'].usd,
                sPrice: data['sonic-3'].usd
            })
            console.log(res.data['ethereum'].usd, prices.ethPrice)

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getUsdPrices()
        getTotals()
    }, [])

    return (
        <ContextPrices.Provider value={{ prices, currentTotals }} >
            {children}
        </ContextPrices.Provider>
    )
}