import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';

import { ETH_CHAINS, SITE_NAME } from '../config/config'

const { provider, webSocketProvider, chains } = configureChains(ETH_CHAINS, [publicProvider()]);

const client = createClient(
  getDefaultClient({
    appName: SITE_NAME,
    autoConnect: false,
    provider,
    webSocketProvider,
    chains,
  })
)

const Web3Provider = ({ children }) => {
	return (
		<WagmiConfig client={client}>
			<ConnectKitProvider>{children}</ConnectKitProvider>
		</WagmiConfig>
	);
}  

export default Web3Provider;
