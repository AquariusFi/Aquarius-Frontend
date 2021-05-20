<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@liquity/lib-base](./lib-base.md) &gt; [ReadableLiquity](./lib-base.readableliquity.md)

## ReadableLiquity interface

Read the state of the Aquarius protocol.

<b>Signature:</b>

```typescript
export interface ReadableLiquity 
```

## Remarks

Implemented by [EthersLiquity](./lib-ethers.ethersliquity.md)<!-- -->.

## Methods

|  Method | Description |
|  --- | --- |
|  [getCollateralSurplusBalance(address)](./lib-base.readableliquity.getcollateralsurplusbalance.md) | Get the amount of leftover collateral available for withdrawal by an address. |
|  [getFees()](./lib-base.readableliquity.getfees.md) | Get a calculator for current fees. |
|  [getFrontendStatus(address)](./lib-base.readableliquity.getfrontendstatus.md) | Check whether an address is registered as a Aquarius frontend, and what its kickback rate is. |
|  [getLiquidityMiningLQTYLpReward(address)](./lib-base.readableliquity.getliquiditymininglqtylpreward.md) | Get the amount of AQU earned by an address through mining liquidity. |
|  [getLiquidityMiningLQTYReward(address)](./lib-base.readableliquity.getliquiditymininglqtyreward.md) | Get the amount of AQU earned by an address through mining liquidity. |
|  [getLiquidityMiningStake(address)](./lib-base.readableliquity.getliquidityminingstake.md) | Get the amount of Uniswap FTM/LUSD LP tokens currently staked by an address in liquidity mining. |
|  [getLiquidityMiningStakeLqtyLp(address)](./lib-base.readableliquity.getliquidityminingstakelqtylp.md) | Get the amount of Uniswap FTM/LUSD LP tokens currently staked by an address in liquidity mining. |
|  [getLQTYBalance(address)](./lib-base.readableliquity.getlqtybalance.md) | Get the amount of AQU held by an address. |
|  [getLqtyLpTokenBalance(address)](./lib-base.readableliquity.getlqtylptokenbalance.md) | Get the amount of Uniswap FTM/LUSD LP tokens held by an address. |
|  [getLQTYStake(address)](./lib-base.readableliquity.getlqtystake.md) | Get the current state of an AQU Stake. |
|  [getLUSDBalance(address)](./lib-base.readableliquity.getlusdbalance.md) | Get the amount of aUSD held by an address. |
|  [getLUSDInStabilityPool()](./lib-base.readableliquity.getlusdinstabilitypool.md) | Get the total amount of aUSD currently deposited in the Stability Pool. |
|  [getNumberOfTroves()](./lib-base.readableliquity.getnumberoftroves.md) | Get number of Troves that are currently open. |
|  [getPrice()](./lib-base.readableliquity.getprice.md) | Get the current price of the native currency (e.g. Ether) in USD. |
|  [getRemainingLiquidityMiningLQTYOReward()](./lib-base.readableliquity.getremainingliquiditymininglqtyoreward.md) | Get the remaining AQU that will be collectively rewarded to liquidity miners. |
|  [getRemainingLiquidityMiningLQTYReward()](./lib-base.readableliquity.getremainingliquiditymininglqtyreward.md) | Get the remaining AQU that will be collectively rewarded to liquidity miners. |
|  [getRemainingStabilityPoolLQTYReward()](./lib-base.readableliquity.getremainingstabilitypoollqtyreward.md) | Get the remaining AQU that will be collectively rewarded to stability depositors. |
|  [getStabilityDeposit(address)](./lib-base.readableliquity.getstabilitydeposit.md) | Get the current state of a Stability Deposit. |
|  [getTotal()](./lib-base.readableliquity.gettotal.md) | Get the total amount of collateral and debt in the Aquarius system. |
|  [getTotalRedistributed()](./lib-base.readableliquity.gettotalredistributed.md) | Get the total collateral and debt per stake that has been liquidated through redistribution. |
|  [getTotalStakedLQTY()](./lib-base.readableliquity.gettotalstakedlqty.md) | Get the total amount of AQU currently staked. |
|  [getTotalStakedLqtyLpTokens()](./lib-base.readableliquity.gettotalstakedlqtylptokens.md) | Get the total amount of Uniswap FTM/LUSD LP tokens currently staked in liquidity mining. |
|  [getTotalStakedUniTokens()](./lib-base.readableliquity.gettotalstakedunitokens.md) | Get the total amount of Uniswap FTM/LUSD LP tokens currently staked in liquidity mining. |
|  [getTrove(address)](./lib-base.readableliquity.gettrove.md) | Get the current state of a Trove. |
|  [getTroveBeforeRedistribution(address)](./lib-base.readableliquity.gettrovebeforeredistribution.md) | Get a Trove in its state after the last direct modification. |
|  [getTroves(params)](./lib-base.readableliquity.gettroves_1.md) | Get a slice from the list of Troves. |
|  [getUniTokenAllowance(address)](./lib-base.readableliquity.getunitokenallowance.md) | Get the liquidity mining contract's allowance of a holder's Uniswap FTM/LUSD LP tokens. |
|  [getUniTokenBalance(address)](./lib-base.readableliquity.getunitokenbalance.md) | Get the amount of Uniswap FTM/LUSD LP tokens held by an address. |
