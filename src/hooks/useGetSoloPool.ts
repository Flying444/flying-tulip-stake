import { useReadContract } from "wagmi"
import { formatEther } from "viem";
import { MainnetABI } from '@/abi/mainnet'
import { mainnet } from "wagmi/chains";

export const useGetSoloPool = () => {
  
  const {data: total, isPending: isPendingSolo, error: errorSolo} = useReadContract({
    abi: MainnetABI.abi,
    address: MainnetABI.address,
    functionName: "totalSoloPoolInvested",
    chainId: mainnet.id,
  });
  
  const totalSolo = total !== undefined && total !== null ? formatEther(total as bigint) : '0' 
  return {
    total: parseFloat(totalSolo),
    isPendingSolo,
    errorSolo
  }
} 