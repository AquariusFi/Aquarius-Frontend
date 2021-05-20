import React from "react";
import { Flex } from "theme-ui";

import { LiquityStoreState } from "@liquity/lib-base";
import { useLiquitySelector } from "@liquity/lib-react";

const selector = ({ remainingLiquidityMiningLQTYOReward }: LiquityStoreState) => ({
  remainingLiquidityMiningLQTYOReward
});

export const RemainingLQTY: React.FC = () => {
  const { remainingLiquidityMiningLQTYOReward } = useLiquitySelector(selector);

  return (
    <Flex sx={{ mr: 2, fontSize: 2, fontWeight: "medium" }}>
      {remainingLiquidityMiningLQTYOReward.prettify(0)} AQU remaining
    </Flex>
  );
};
