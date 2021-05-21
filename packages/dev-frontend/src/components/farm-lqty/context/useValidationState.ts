import { Decimal, LiquityStoreState } from "@liquity/lib-base";
import { useLiquitySelector } from "@liquity/lib-react";

const selector = ({
  lqtyLpTokenBalance,
  lqtyLpTokenAllowance,
  liquidityMiningStakeLqtyLp
}: LiquityStoreState) => ({
  lqtyLpTokenBalance,
  lqtyLpTokenAllowance,
  liquidityMiningStakeLqtyLp
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
  const { lqtyLpTokenBalance, lqtyLpTokenAllowance, liquidityMiningStakeLqtyLp } = useLiquitySelector(selector);
  const isWithdrawing = liquidityMiningStakeLqtyLp.gt(amount);
  const amountChanged = isWithdrawing
    ? liquidityMiningStakeLqtyLp.sub(amount)
    : Decimal.from(amount).sub(liquidityMiningStakeLqtyLp);
  const maximumStake = liquidityMiningStakeLqtyLp.add(lqtyLpTokenBalance);
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

  const hasApproved = !lqtyLpTokenAllowance.isZero && lqtyLpTokenAllowance.gte(amountChanged);
  const hasEnoughUniToken = !lqtyLpTokenBalance.isZero && lqtyLpTokenBalance.gte(amountChanged);

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
