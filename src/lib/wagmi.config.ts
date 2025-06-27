import { createConfig, http } from 'wagmi'
import { mainnet, bsc, sonic } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, bsc, sonic],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [sonic.id] : http(),
  },
  connectors: [injected()],
})