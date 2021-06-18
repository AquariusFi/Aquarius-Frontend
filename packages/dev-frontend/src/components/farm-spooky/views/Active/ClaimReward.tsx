import React, { useEffect } from "react";
import { Button } from "theme-ui";
import { useLiquity } from "../../../../hooks/LiquityContext";
import { Transaction, useMyTransactionState } from "../../../Transaction";
import { useFarmViewLp } from "../../context/FarmViewContext";

const transactionId = "farm-claim-reward";

export const ClaimReward: React.FC = () => {
  const { dispatchEvent } = useFarmViewLp();

  const {
    liquity: { send: liquity }
  } = useLiquity();

  const transactionState = useMyTransactionState(transactionId);

  useEffect(() => {
    if (transactionState.type === "confirmedOneShot") {
      dispatchEvent("CLAIM_REWARD_CONFIRMED");
    }
  }, [transactionState.type, dispatchEvent]);

  return (
    <Transaction
      id={transactionId}
      send={liquity.withdrawLQTY1RewardFromLiquidityMining.bind(liquity)}
      showFailure="asTooltip"
      tooltipPlacement="bottom"
    >
      <Button>Claim reward</Button>
    </Transaction>
  );
};
