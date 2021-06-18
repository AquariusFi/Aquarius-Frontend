import React, { useCallback } from "react";
import { Card, Heading, Box, Flex, Button } from "theme-ui";
import { LP, GT } from "../../../../strings";
import { LiquityStoreState } from "@liquity/lib-base";
import { useLiquitySelector } from "@liquity/lib-react";
import { Icon } from "../../../Icon";
import { LoadingOverlay } from "../../../LoadingOverlay";
import { useMyTransactionState } from "../../../Transaction";
import { DisabledEditableRow, StaticRow } from "../../../Trove/Editor";
import { useFarmViewLp } from "../../context/FarmViewContext";
import { RemainingLQTY } from "../RemainingLQTY";
import { ClaimReward } from "./ClaimReward";
import { UnstakeAndClaim } from "../UnstakeAndClaim";
import { Yield } from "../Yield";

const selector = ({
  liquidityMiningStakeAusdLp,
  liquidityMiningLQTY1LpReward,
  totalStakedAusdLpTokens
}: LiquityStoreState) => ({
  liquidityMiningStakeAusdLp,
  liquidityMiningLQTY1LpReward,
  totalStakedAusdLpTokens
});
const transactionId = /farm-/i;

export const Active: React.FC = () => {
  const { dispatchEvent } = useFarmViewLp();
  const {
    liquidityMiningStakeAusdLp,
    liquidityMiningLQTY1LpReward,
    totalStakedAusdLpTokens
  } = useLiquitySelector(selector);

  const handleAdjustPressed = useCallback(() => {
    dispatchEvent("ADJUST_PRESSED");
  }, [dispatchEvent]);

  const transactionState = useMyTransactionState(transactionId);
  const isTransactionPending =
    transactionState.type === "waitingForApproval" ||
    transactionState.type === "waitingForConfirmation";

  const poolShare = liquidityMiningStakeAusdLp.mulDiv(100, totalStakedAusdLpTokens);

  return (
    <Card>
      <Heading>
      Spooky Liquidity Farm
        {!isTransactionPending && (
          <Flex sx={{ justifyContent: "flex-end" }}>
            <RemainingLQTY />
          </Flex>
        )}
      </Heading>
      <Box sx={{ p: [2, 3] }}>
        <Box>
          <DisabledEditableRow
            label="Stake"
            inputId="farm-stake"
            amount={liquidityMiningStakeAusdLp.prettify(4)}
            unit={LP}
          />
          {poolShare.infinite ? (
            <StaticRow label="Pool share" inputId="farm-share" amount="N/A" />
          ) : (
            <StaticRow
              label="Pool share"
              inputId="farm-share"
              amount={poolShare.prettify(4)}
              unit={"%"}
            />
          )}
          <Flex sx={{ alignItems: "center" }}>
            <StaticRow
              label="Reward"
              inputId="farm-reward"
              amount={liquidityMiningLQTY1LpReward.prettify(4)}
              color={liquidityMiningLQTY1LpReward.nonZero && "success"}
              unit={GT}
            />
            <Flex sx={{ justifyContent: "flex-end", flex: 1 }}>
              <Yield />
            </Flex>
          </Flex>
        </Box>

        <Flex variant="layout.actions">
          <Button variant="outline" onClick={handleAdjustPressed}>
            <Icon name="pen" size="sm" />
            &nbsp;Adjust
          </Button>
          <ClaimReward />
        </Flex>
        <Flex>
          <UnstakeAndClaim />
        </Flex>
      </Box>
      {isTransactionPending && <LoadingOverlay />}
    </Card>
  );
};
