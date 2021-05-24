import { Button } from "theme-ui";

import { Decimal,LiquityStoreState } from "@liquity/lib-base";
import { useLiquitySelector } from "@liquity/lib-react";

import { useLiquity } from "../../hooks/LiquityContext";
import { useTransactionFunction } from "../Transaction";

const selectLQTYStake = ({ lqtyStake }: LiquityStoreState) => lqtyStake;

type StakingType = {
  LQTYGain:Decimal | undefined
}

export const StakingGainsAction: React.FC<StakingType> = ({LQTYGain}) => {
  const { liquity } = useLiquity();
  const { collateralGain, lusdGain } = useLiquitySelector(selectLQTYStake);

  const [sendTransaction] = useTransactionFunction(
    "stake",
    liquity.send.withdrawGainsFromStaking.bind(liquity.send)
  );

  return (
    <Button onClick={sendTransaction} disabled={collateralGain.isZero && lusdGain.isZero && LQTYGain && LQTYGain.isZero}>
      Claim gains
    </Button>
  );
};
