import { TabItem, Tabs } from "flowbite-react";
import { TvlComp } from "./TvlComp";
import { Deposit } from "@/components/deposit/Deposit";
import { Withdraw } from '@/components/withdraw/Withdraw';
import { useAccount } from "wagmi";
import { CiInboxIn } from "react-icons/ci";
import { PiHandDeposit  } from "react-icons/pi";
import { GiTakeMyMoney } from "react-icons/gi";
import { TCardComp } from "@/types"


export const Navmenu = ({tvl}: TCardComp) => {
    const {isConnected} = useAccount()
    return (
        <div className="flex h-full items-center">
        <Tabs aria-label="" className="text-white"  variant="underline" >
            <TabItem active title="Stake" icon={GiTakeMyMoney} style={{ color: '#ffff', cursor: 'pointer' }}>
                <TvlComp tvl={tvl} />
            </TabItem>
            <TabItem title="Deposit" icon={CiInboxIn} className="active:text-[#F5F57A] active:border-[#F5F57A] hover:cursor-pointer">
                {isConnected && (<Deposit />)}
            </TabItem>
            <TabItem title="Withdraw" icon={PiHandDeposit} className="active:text-[#F5F57A] active:border-[#F5F57A] hover:cursor-pointer">
                {isConnected && (<Withdraw />)}
            </TabItem>
        </Tabs>
        </div>
    )
}