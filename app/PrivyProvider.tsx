'use client'

import { PrivyProvider } from '@privy-io/react-auth'
import { PrivyWagmiConnector } from '@privy-io/wagmi-connector';
import {foundry, localhost} from '@wagmi/chains';
import { configureChains } from 'wagmi';
// import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";


const configureChainsConfig = configureChains(
  [foundry],
  [
    publicProvider()
  ]
)


export default function Provider({
  children
}) {
    return (
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
        config={{
          loginMethods: ['email', 'wallet', 'google', 'apple'],
          appearance: {
            theme: 'dark',
            accentColor: '#676FFF',
            logo: '/images/OnlySubs.jpg',
          },
          embeddedWallets: {
            createOnLogin: 'all-users',
            noPromptOnSignature: false
          },
          // rpcConfig: {
          //   rpcUrls: {
          //     1337 : "http://127.0.0.1:8545",
          // }
          // },
          additionalChains: [foundry]
        }}>
                <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>

           {children}
           </PrivyWagmiConnector>
      </PrivyProvider>
    )
}