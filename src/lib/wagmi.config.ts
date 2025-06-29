import { http } from 'viem'
import {
  getDefaultConfig
} from '@rainbow-me/rainbowkit';
import { mainnet, bsc, sonic } from 'wagmi/chains'

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

const projectId = '3c96f3b35cd54269e006ef63e1c22c38'  //import.meta.env.PROJECT_ID

export const config = getDefaultConfig({
  appName: 'flyingtulip',
  projectId: projectId,
  chains: [mainnet, bsc, sonic],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [sonic.id] : http(),
  },
})