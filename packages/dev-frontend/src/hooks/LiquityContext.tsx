import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Provider } from "@ethersproject/abstract-provider";
import { getNetwork } from "@ethersproject/networks";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

import { isBatchedProvider, isWebSocketAugmentedProvider } from "@liquity/providers";
import {
  BlockPolledLiquityStore,
  EthersLiquity,
  EthersLiquityWithStore,
  _connectByChainId
} from "@liquity/lib-ethers";

import { connectContract,cakeLpContract,lqtyLpContract } from '../eth-contract/ContractApi'

import { ethers } from "ethers";

import { Decimal, Decimalish,Percent, StabilityDeposit, LiquityStoreState } from "@liquity/lib-base";

import { LiquityFrontendConfig, getConfig } from "../config";

type LiquityContextValue = {
  config: LiquityFrontendConfig;
  account: string;
  provider: Provider;
  liquity: EthersLiquityWithStore<BlockPolledLiquityStore>;
  meContract: any;
};

const LiquityContext = createContext<LiquityContextValue | undefined>(undefined);

type LiquityProviderProps = {
  loader?: React.ReactNode;
  unsupportedNetworkFallback?: (chainId: number) => React.ReactNode;
  unsupportedMainnetFallback?: React.ReactNode;
};

const wsParams = (network: any, infuraApiKey: string): [string, string] => [
  // `wss://${network === "homestead" ? "mainnet" : network}.infura.io/ws/v3/${infuraApiKey}`,
  // 'wss://dex-atlantic.binance.org/api/ws/NEXO-A84_BNB@marketDepth100'
  // network.chainId==='56'?'wss://dex-atlantic.binance.org/api/ws/NEXO-A84_BNB@marketDepth100':`wss://testnet-de.binance.org/api/ws/ALT-3B6_BNB@marketDepth100`,
  // `wss://testnet-de.binance.org/api/ws/ALT-3B6_BNB@marketDepth100`,
  // `wss://ws-testnet.hecochain.com`,
  `wss://rpcapi.fantom.network`,
  network.name
];

const supportedNetworks = ["homestead", "kovan", "rinkeby", "ropsten", "goerli"];

export const LiquityProvider: React.FC<LiquityProviderProps> = ({
  children,
  loader,
  unsupportedNetworkFallback,
  unsupportedMainnetFallback
}) => {
  const { library: provider, account, chainId } = useWeb3React<Web3Provider>();
  const [config, setConfig] = useState<LiquityFrontendConfig>();

  const connection = useMemo(() => {
    if (config && provider && account && chainId) {

      try {
        let obj:any = { contractEth: {},contractCakeLp:{},contractLqtyLp:{},};
        obj.contractEth = connectContract(provider, provider.getSigner(account),chainId);
        obj.contractCakeLp = cakeLpContract(provider, provider.getSigner(account));
        obj.contractLqtyLp = lqtyLpContract(provider, provider.getSigner(account));
        
        // return _connectByChainId(provider, provider.getSigner(account), chainId, {
        //   userAddress: account,
        //   frontendTag: config.frontendTag,
        //   useStore: "blockPolled"
        // });
        const connectByChainId: any = _connectByChainId(provider, provider.getSigner(account), chainId, {
          userAddress: account,
          frontendTag: config.frontendTag,
          useStore: "blockPolled"
        });
        
        const contractEth = Object.assign(obj, connectByChainId._contracts);
        return Object.assign(connectByChainId, {contractEth})
      } catch {}
    }
  }, [config, provider, account, chainId]);

  useEffect(() => {
    getConfig().then(setConfig);
  }, []);

  useEffect(() => {
    if (config && connection) {
      const { provider, chainId } = connection;

      if (isBatchedProvider(provider) && provider.chainId !== chainId) {
        provider.chainId = chainId;
      }

      if (isWebSocketAugmentedProvider(provider)) {
        const network = getNetwork(chainId);

        if (network.name && supportedNetworks.includes(network.name) && config.infuraApiKey) {
          provider.openWebSocket(...wsParams(network, config.infuraApiKey));
        } else if (connection._isDev) {
          provider.openWebSocket(`ws://${window.location.hostname}:8546`, chainId);
        }

        return () => {
          provider.closeWebSocket();
        };
      }
    }
  }, [config, connection]);
  
  if (!config || !provider || !account || !chainId) {
    return <>{loader}</>;
  }

  if (config.testnetOnly && chainId === 1) {
    return <>{unsupportedMainnetFallback}</>;
  }

  // if (!connection || (chainId !== 97 && chainId !== 56)) {
  if (!connection||chainId!==250) {
    return unsupportedNetworkFallback ? <>{unsupportedNetworkFallback(chainId)}</> : null;
  }

  const liquity = EthersLiquity._from(connection);
  liquity.store.logging = true;

  const meContract = connection.contractEth;

  console.log(meContract,liquity,connection)

  return (
    <LiquityContext.Provider value={{ config, account, provider, liquity, meContract }}>
      {children}
    </LiquityContext.Provider>
  );
};

export const useLiquity = () => {
  const liquityContext = useContext(LiquityContext);

  if (!liquityContext) {
    throw new Error("You must provide a LiquityContext via LiquityProvider");
  }

  return liquityContext;
};
