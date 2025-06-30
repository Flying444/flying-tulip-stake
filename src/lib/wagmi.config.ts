import { http } from 'wagmi'
import {
  getDefaultConfig
} from '@rainbow-me/rainbowkit';
import { mainnet, bsc, sonic } from 'wagmi/chains'

const projectId = import.meta.env.VITE_PROJECT_ID
const apiKey = import.meta.env.VITE_API_KEY
export const config = getDefaultConfig({
  appName: 'flyingtulip',
  projectId: projectId,
  chains: [mainnet, bsc, sonic],
  transports: {
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${apiKey}`),
    [bsc.id]: http(`https://opbnb-mainnet.g.alchemy.com/v2/${apiKey}`),
    [sonic.id] : http(`https://sonic-mainnet.g.alchemy.com/v2/${apiKey}`),
  },
  ssr: true
})
