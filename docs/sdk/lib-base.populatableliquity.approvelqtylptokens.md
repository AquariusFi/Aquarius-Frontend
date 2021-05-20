<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@liquity/lib-base](./lib-base.md) &gt; [PopulatableLiquity](./lib-base.populatableliquity.md) &gt; [approveLqtyLpTokens](./lib-base.populatableliquity.approvelqtylptokens.md)

## PopulatableLiquity.approveLqtyLpTokens() method

Allow the liquidity mining contract to use Uniswap FTM/aUSD LP tokens for [staking](./lib-base.transactableliquity.stakeunitokens.md)<!-- -->.

<b>Signature:</b>

```typescript
approveLqtyLpTokens(allowance?: Decimalish): Promise<PopulatedLiquityTransaction<P, SentLiquityTransaction<S, LiquityReceipt<R, void>>>>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  allowance | [Decimalish](./lib-base.decimalish.md) | Maximum amount of LP tokens that will be transferrable to liquidity mining (<code>2^256 - 1</code> by default). |

<b>Returns:</b>

Promise&lt;[PopulatedLiquityTransaction](./lib-base.populatedliquitytransaction.md)<!-- -->&lt;P, [SentLiquityTransaction](./lib-base.sentliquitytransaction.md)<!-- -->&lt;S, [LiquityReceipt](./lib-base.liquityreceipt.md)<!-- -->&lt;R, void&gt;&gt;&gt;&gt;

## Remarks

Must be performed before calling [stakeUniTokens()](./lib-base.transactableliquity.stakeunitokens.md)<!-- -->.
