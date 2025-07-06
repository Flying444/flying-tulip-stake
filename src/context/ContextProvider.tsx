import {
    createContext,
    ReactNode,
    useEffect,
    useState,
    useRef
} from "react";
import axios from "axios";

type TContextPrices = {
    ethPrice: number;
    bnbPrice: number;
    sPrice: number;
};

type Ttimer = {
    hours: number;
    minutes: number;
    seconds: number;
}

type TGlobal = {
    prices: TContextPrices;
    currentTime: Ttimer;
}


const initVal = {
    ethPrice: 0,
    bnbPrice: 0,
    sPrice: 0,
}

const initialTime = 3 * 60 * 60;


export const ContextPrices = createContext<TGlobal>({
    prices: initVal,
    currentTime: {
        hours: initialTime,
        minutes: 0,
        seconds: 0
    },
});

export function ContextPricesProvider({ children }: { children: ReactNode }) {
    const [prices, setPrices] = useState<TContextPrices>(initVal);
    const [timeLeft, setTimeLeft] = useState<number>(initialTime);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const formatTime = (seconds: number): Ttimer => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return { hours, minutes, seconds: remainingSeconds };
    };

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


    useEffect(() => {
        const startInterval = () => {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(intervalRef.current!);
                        return initialTime;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        };

        startInterval();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const currentTime = formatTime(timeLeft);

    return (
        <ContextPrices.Provider value={{ prices, currentTime }} >
            {children}
        </ContextPrices.Provider>
    )


}