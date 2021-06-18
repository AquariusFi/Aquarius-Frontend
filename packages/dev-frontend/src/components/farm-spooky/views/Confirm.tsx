import React, { useEffect } from "react";
import { Button } from "theme-ui";
import { Decimal } from "@liquity/lib-base";
import { useLiquity } from "../../../hooks/LiquityContext";
import { Transaction, useMyTransactionState } from "../../Transaction";
import { useValidationState } from "../context/useValidationState";
import { useFarmViewLp } from "../context/FarmViewContext";

type ConfirmProps = {
  amount: Decimal;
};

const transactionId = "farm-confirm-lp1";

export const Confirm: React.FC<ConfirmProps> = ({ amount }) => {
  const { dispatchEvent } = useFarmViewLp();
  const {
    liquity: { send: liquity }
  } = useLiquity();

  const transactionState = useMyTransactionState(transactionId);
  const { isValid, isWithdrawing, amountChanged } = useValidationState(amount);

  const transactionAction = isWithdrawing
    ? liquity.unstakeLqty1LpTokens.bind(liquity, amountChanged)
    : liquity.stakeLqty1LpTokens.bind(liquity, amountChanged);

  const shouldDisable = amountChanged.isZero || !isValid;

  useEffect(() => {
    if (transactionState.type === "confirmedOneShot") {
      dispatchEvent("STAKE_CONFIRMED");
    }
  }, [transactionState.type, dispatchEvent]);

  return (
    <Transaction
      id={transactionId}
      send={transactionAction}
      showFailure="asTooltip"
      tooltipPlacement="bottom"
    >
      <Button disabled={shouldDisable}>Confirm</Button>
    </Transaction>
  );
};
