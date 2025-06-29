import { IconType } from "react-icons/lib";

export type TCard = {
  namePool: string;
  totalAmount: number;
};

export type TCardComp = {
  tvl: TCard[];
}

export type TDeposit = {
  asset: 'ETH' | 'BNB' | 'S';
  contractAddress: `0x${string}`;
  amount: bigint;
}

export type TUserData = {
  icon: IconType[];
  amount: bigInt | number | string;
  description: string;
}