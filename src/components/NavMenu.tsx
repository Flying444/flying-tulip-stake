import { TabItem, Tabs } from "flowbite-react";
import { Deposit } from "@/components/deposit/Deposit";
import { Withdraw } from '@/components/withdraw/Withdraw';
import { PiHandDeposit  } from "react-icons/pi";
import { GiTakeMyMoney } from "react-icons/gi";


export const Navmenu = () => {
    return (
        <div className="flex h-full justify-center w-full items-center">
        <Tabs aria-label="" className="flex items-center"  variant="underline" >
            <TabItem active title="Stake" icon={GiTakeMyMoney} style={{ color: '#ffff', cursor: 'pointer' }}>
                <Deposit />
            </TabItem>
            <TabItem title="Withdraw" icon={PiHandDeposit} className="active:text-[#F5F57A] active:border-[#F5F57A] hover:cursor-pointer">
                <Withdraw />
            </TabItem>
        </Tabs>
        </div>
    )
}