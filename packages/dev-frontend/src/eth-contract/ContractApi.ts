import {
  Contract,
} from "@ethersproject/contracts";

import { Provider } from "@ethersproject/abstract-provider";
import { Signer } from "@ethersproject/abstract-signer";

import PancakeSwapAbi from './abi-json/PancakeSwapAbi.json';
import CakeLpAbi from './abi-json/CakeLpAbi.json';

export const contract_address = {
  fantom: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',  // 去中心话交易所合约
  lusdLp: '0xD87d6e7ACFe1443C28367E718dae28A12904a05F',  // aUSD-FTM LP合约
  lqtyLp: '0x06eE0e1166dAf465a0b02Cdd86A99715AcAbB113',  // AQU-FTM LP合约
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