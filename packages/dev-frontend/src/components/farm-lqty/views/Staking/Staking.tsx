import React, { useCallback, useState } from "react";
import { Heading, Box, Flex, Card, Button } from "theme-ui";
import { Decimal, LiquityStoreState } from "@liquity/lib-base";
import { LP1 } from "../../../../strings";
import { Icon } from "../../../Icon";
import { EditableRow, StaticRow } from "../../../Trove/Editor";
import { LoadingOverlay } from "../../../LoadingOverlay";
import { useFarmViewLp } from "../../context/FarmViewContext";
import { useMyTransactionState } from "../../../Transaction";
import { Confirm } from "../Confirm";
import { Description } from "../Description";
import { Approve } from "../Approve";
import { Validation } from "../Validation";
import { useValidationState } from "../../context/useValidationState";
import { useLiquitySelector } from "@liquity/lib-react";

const transactionId = /farm-/;
const selector = ({ totalStakedLqtyLpTokens }: LiquityStoreState) => ({ totalStakedLqtyLpTokens });

export const Staking: React.FC = () => {
  const { dispatchEvent } = useFarmViewLp();
  const { totalStakedLqtyLpTokens } = useLiquitySelector(selector);

  const [amount, setAmount] = useState<Decimal>(Decimal.from(0));
  const editingState = useState<string>();
  const isDirty = !amount.isZero;

  const { maximumStake, hasSetMaximumStake } = useValidationState(amount);

  const transactionState = useMyTransactionState(transactionId);
  const isTransactionPending =
    transactionState.type === "waitingForApproval" ||
    transactionState.type === "waitingForConfirmation";

  const handleCancelPressed = useCallback(() => {
    dispatchEvent("CANCEL_PRESSED");
  }, [dispatchEvent]);

  const nextTotalStakedUniTokens = totalStakedLqtyLpTokens.add(amount);

  const poolShare = amount.mulDiv(100, nextTotalStakedUniTokens);

  return (
    <Card>
      <Heading>
      Sushi Liquidity Farm
        {isDirty && !isTransactionPending && (
          <Button
            variant="titleIcon"
            sx={{ ":enabled:hover": { color: "danger" } }}
            onClick={() => setAmount(Decimal.from(0))}
          >
            <Icon name="history" size="lg" />
          </Button>
        )}
      </Heading>

      <Box sx={{ p: [2, 3] }}>
        <EditableRow
          label="Stake"
          inputId="amount-lp"
          amount={amount.prettify(4)}
          unit={LP1}
          editingState={editingState}
          editedAmount={amount.toString(4)}
          setEditedAmount={amount => setAmount(Decimal.from(amount))}
          maxAmount={maximumStake.toString()}
          maxedOut={hasSetMaximumStake}
        ></EditableRow>

        {poolShare.infinite ? (
          <StaticRow label="Pool share" inputId="farm-share" amount="N/A" />
        ) : (
          <StaticRow
            label="Pool share"
            inputId="farm-share"
            amount={poolShare.prettify(4)}
            unit="%"
          />
        )}

        {isDirty && <Validation amount={amount} />}
        <Description amount={amount} />

        <Flex variant="layout.actions">
          <Button variant="cancel" onClick={handleCancelPressed}>
            Cancel
          </Button>
          <Approve amount={amount} />
          <Confirm amount={amount} />
        </Flex>
      </Box>
      {isTransactionPending && <LoadingOverlay />}
    </Card>
  );
};
