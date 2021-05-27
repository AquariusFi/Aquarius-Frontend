import {
  Contract,
} from "@ethersproject/contracts";

import { Provider } from "@ethersproject/abstract-provider";
import { Signer } from "@ethersproject/abstract-signer";

import PancakeSwapAbi from './abi-json/PancakeSwapAbi.json';
import CakeLpAbi from './abi-json/CakeLpAbi.json';

export const contract_address = {
  fantom: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',  // 去中心话交易所合约
  lusdLp: '0x97Bc7FB4F3D3F7749A7A3a0953974dcD1AF89713',  // aUSD-FTM LP合约
  lqtyLp: '0x7B63e44749884f33cb688F4870dD44dEC1195A9B',  // AQU-FTM LP合约
}

type EthersProvider = Provider;
type EthersSigner = Signer;

export const connectContract = (
  provider: EthersProvider,
  signer: EthersSigner | undefined,
  chainId:number
) => {
  const contract = new Contract(contract_address.fantom, PancakeSwapAbi as any, signer ?? provider);
  return contract;
}

export const cakeLpContract = (
  provider: EthersProvider,
  signer: EthersSigner | undefined,
) => {
  const contract = new Contract(contract_address.lusdLp, CakeLpAbi as any, signer ?? provider);
  return contract;
}

export const lqtyLpContract = (
  provider: EthersProvider,
  signer: EthersSigner | undefined,
) => {
  const contract = new Contract(contract_address.lqtyLp, CakeLpAbi as any, signer ?? provider);
  return contract;
}