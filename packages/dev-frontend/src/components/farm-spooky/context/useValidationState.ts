import { Decimal, LiquityStoreState } from "@liquity/lib-base";
import { useLiquitySelector } from "@liquity/lib-react";

const selector = ({
  lqty1LpTokenBalance,
  lqty1LpTokenAllowance,
  liquidityMiningStakeAusdLp
}: LiquityStoreState) => ({
  lqty1LpTokenBalance,
  lqty1LpTokenAllowance,
  liquidityMiningStakeAusdLp
});

type FarmStakeValidation = {
  isValid: boolean;
  hasApproved: boolean;
  hasEnoughUniToken: boolean;
  isWithdrawing: boolean;
  amountChanged: Decimal;
  maximumStake: Decimal;
  hasSetMaximumStake: boolean;
};

export const useValidationState = (amount: Decimal): FarmStakeValidation => {
  const { lqty1LpTokenBalance, lqty1LpTokenAllowance, liquidityMiningStakeAusdLp } = useLiquitySelector(selector);
  const isWithdrawing = liquidityMiningStakeAusdLp.gt(amount);
  const amountChanged = isWithdrawing
    ? liquidityMiningStakeAusdLp.sub(amount)
    : Decimal.from(amount).sub(liquidityMiningStakeAusdLp);
  const maximumStake = liquidityMiningStakeAusdLp.add(lqty1LpTokenBalance);
  const hasSetMaximumStake = amount.eq(maximumStake);

  if (isWithdrawing) {
    return {
      isValid: true,
      hasApproved: true,
      hasEnoughUniToken: true,
      isWithdrawing,
      amountChanged,
      maximumStake,
      hasSetMaximumStake
    };
  }

  const hasApproved = !lqty1LpTokenAllowance.isZero && lqty1LpTokenAllowance.gte(amountChanged);
  const hasEnoughUniToken = !lqty1LpTokenBalance.isZero && lqty1LpTokenBalance.gte(amountChanged);

  return {
    isValid: hasApproved && hasEnoughUniToken,
    hasApproved,
    hasEnoughUniToken,
    isWithdrawing,
    amountChanged,
    maximumStake,
    hasSetMaximumStake
  };
};
