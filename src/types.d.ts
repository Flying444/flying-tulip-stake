import { IconType } from "react-icons/lib";

export type TCard = {
  namePool: string;
  totalAmount: bigint | string;
  isLoading?: boolean;
};

export type TTvlContract = {
  contractEth: `0x${string}`;
  contractBnb: `0x${string}`;
  contractSonic?: `0x${string}`;
}

export type TCardComp = {
  tvl: TCard[];
}

export type TDeposit = {
  chainId: number;
  amount: string;
}

export type TUserData = {
  icon: IconType[];
  amount: bigInt | number | string;
  description: string;
}