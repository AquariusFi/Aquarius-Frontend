import React from "react";
import { Card, Heading, Box, Flex } from "theme-ui";
import { LiquityStoreState } from "@liquity/lib-base";
import { useLiquitySelector } from "@liquity/lib-react";
import { InfoMessage } from "../../../InfoMessage";
import { UnstakeAndClaim } from "../UnstakeAndClaim";
import { RemainingLQTY } from "../RemainingLQTY";
import { StaticRow } from "../../../Trove/Editor";
import { GT, LP } from "../../../../strings";

const selector = ({ liquidityMiningStakeAusdLp, liquidityMiningLQTY1LpReward }: LiquityStoreState) => ({
  liquidityMiningStakeAusdLp,
  liquidityMiningLQTY1LpReward
});

export const Disabled: React.FC = () => {
  const { liquidityMiningStakeAusdLp, liquidityMiningLQTY1LpReward } = useLiquitySelector(selector);
  const hasStake = !liquidityMiningStakeAusdLp.isZero;

  return (
    <Card>
      <Heading>
      Spooky Liquidity Farm
        <Flex sx={{ justifyContent: "flex-end" }}>
          <RemainingLQTY />
        </Flex>
      </Heading>
      <Box sx={{ p: [2, 3] }}>
        <InfoMessage title="Liquidity farming period has finished">
        <Flex>There are no more AQU rewards left to farm</Flex>
        {/* <InfoMessage title="FTM/AQU Coming Soon">
          <Flex> This LP farming will be available in 12 hours, estimated at 2:00:00 UTC, May 28th, 2021.</Flex> */}
          
        </InfoMessage>
        {hasStake && (
          <>
            <Box sx={{ border: 1, pt: 3, borderRadius: 3 }}>
              <StaticRow
                label="Stake"
                inputId="farm-deposit"
                amount={liquidityMiningStakeAusdLp.prettify(4)}
                unit={LP}
              />
              <StaticRow
                label="Reward"
                inputId="farm-reward"
                amount={liquidityMiningLQTY1LpReward.prettify(4)}
                color={liquidityMiningLQTY1LpReward.nonZero && "success"}
                unit={GT}
              />
            </Box>
            <UnstakeAndClaim />
          </>
        )}
      </Box>
    </Card>
  );
};
