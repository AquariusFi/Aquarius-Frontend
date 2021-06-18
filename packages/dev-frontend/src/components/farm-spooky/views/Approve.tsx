import React, { useEffect } from "react";
import { Button } from "theme-ui";
import { Decimal } from "@liquity/lib-base";
import { useLiquity } from "../../../hooks/LiquityContext";
import { Transaction, useMyTransactionState } from "../../Transaction";
import { useFarmViewLp } from "../context/FarmViewContext";
import { useValidationState } from "../context/useValidationState";

type ApproveProps = {
  amount: Decimal;
};

const transactionId = "farm-approve-lp1";

export const Approve: React.FC<ApproveProps> = ({ amount }) => {
  const { dispatchEvent } = useFarmViewLp();
  const {
    liquity: { send: liquity }
  } = useLiquity();

  const { hasApproved } = useValidationState(amount);
  const transactionState = useMyTransactionState(transactionId);

  useEffect(() => {
    if (transactionState.type === "confirmedOneShot") {
      dispatchEvent("STAKE_APPROVED");
    }
  }, [transactionState.type, dispatchEvent]);

  if (hasApproved) {
    return null;
  }

  return (
    <Transaction
      id={transactionId}
      send={liquity.approveLqty1LpTokens.bind(liquity, undefined)}
      showFailure="asTooltip"
      tooltipPlacement="bottom"
    >
      <Button sx={{ width: "60%" }}>Approve Spooky LP</Button>
    </Transaction>
  );
};
