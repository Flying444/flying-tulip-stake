import {
    createContext,
    ReactNode,
    useEffect,
    useState,
} from "react";
import axios from "axios";

type TContextPrices = {
    ethPrice: number;
    bnbPrice: number;
    sPrice: number;
};


const initVal = {
    ethPrice: 0,
    bnbPrice: 0,
    sPrice: 0,
}

export const ContextPrices = createContext<TContextPrices>(initVal);

export function ContextPricesProvider({ children }: { children: ReactNode }) {
    const [prices, setPrices] = useState<TContextPrices>(initVal);

    const getUsdPrices = async () => {
        try {
            const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,binancecoin,sonic-3&vs_currencies=usd');
            const data = res.data
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
    }, [])

    return (
        <ContextPrices.Provider value={prices} >
            {children}
        </ContextPrices.Provider>
    )


}