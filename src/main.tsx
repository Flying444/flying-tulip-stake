import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ContextPricesProvider } from '@/context/ContextProvider.tsx';
import { WagmiProvider } from "wagmi";
import {
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from './lib/wagmi.config'
import App from './App.tsx'
import '@rainbow-me/rainbowkit/styles.css';
import './index.css'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ContextPricesProvider>
            <App/>
          </ContextPricesProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)
