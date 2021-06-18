import React, { useState, useCallback, useEffect, useRef } from "react";
import { LiquityStoreState, Decimal } from "@liquity/lib-base";
import { useLiquitySelector } from "@liquity/lib-react";
import { FarmViewContextLp } from "./FarmViewContext";
import { transitions } from "./transitions";
import type { FarmView, FarmEvent } from "./transitions";

const transition = (view: FarmView, event: FarmEvent): FarmView => {
  const nextView = transitions[view][event] ?? view;
  return nextView;
};

const getInitialView = (
  liquidityMiningStakeAusdLp: Decimal,
  remainingLiquidityMiningLQTY1Reward: Decimal
): FarmView => {
  if (remainingLiquidityMiningLQTY1Reward.isZero) return "DISABLED";
  if (liquidityMiningStakeAusdLp.isZero) return "INACTIVE";
  return "ACTIVE";
};

const selector = ({
  liquidityMiningStakeAusdLp,
  remainingLiquidityMiningLQTY1Reward
}: LiquityStoreState) => ({ liquidityMiningStakeAusdLp, remainingLiquidityMiningLQTY1Reward });

export const FarmViewProviderSpooky: React.FC = props => {
  const { children } = props;
  const { liquidityMiningStakeAusdLp, remainingLiquidityMiningLQTY1Reward } = useLiquitySelector(selector);

  const [view, setView] = useState<FarmView>(
    getInitialView(liquidityMiningStakeAusdLp, remainingLiquidityMiningLQTY1Reward)
  );
  const viewRef = useRef<FarmView>(view);

  const dispatchEvent = useCallback((event: FarmEvent) => {
    const nextView = transition(viewRef.current, event);

    console.log(
      "dispatchEvent() [current-view, event, next-view]",
      viewRef.current,
      event,
      nextView
    );
    setView(nextView);
  }, []);

  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  useEffect(() => {
    if (liquidityMiningStakeAusdLp.isZero) {
      dispatchEvent("UNSTAKE_AND_CLAIM_CONFIRMED");
    }
  }, [liquidityMiningStakeAusdLp.isZero, dispatchEvent]);

  const provider = {
    view,
    dispatchEvent
  };

  return <FarmViewContextLp.Provider value={provider}>{children}</FarmViewContextLp.Provider>;
};
