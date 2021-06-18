import React from "react";
import { Flex } from "theme-ui";

import { LiquityStoreState } from "@liquity/lib-base";
import { useLiquitySelector } from "@liquity/lib-react";

const selector = ({ remainingLiquidityMiningLQTY1Reward }: LiquityStoreState) => ({
  remainingLiquidityMiningLQTY1Reward
});

export const RemainingLQTY: React.FC = () => {
  const { remainingLiquidityMiningLQTY1Reward } = useLiquitySelector(selector);

  return (
    <Flex sx={{ mr: 2, fontSize: 2, fontWeight: "medium" }}>
      {remainingLiquidityMiningLQTY1Reward.prettify(0)} AQU remaining
    </Flex>
  );
};
