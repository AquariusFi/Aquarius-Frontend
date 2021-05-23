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
  liquidityMiningStakeLqtyLp: Decimal,
  remainingLiquidityMiningLQTYOReward: Decimal
): FarmView => {
  if (remainingLiquidityMiningLQTYOReward.isZero) return "DISABLED";
  if (liquidityMiningStakeLqtyLp.isZero) return "INACTIVE";
  return "ACTIVE";
};

const selector = ({
  liquidityMiningStakeLqtyLp,
  remainingLiquidityMiningLQTYOReward
}: LiquityStoreState) => ({ liquidityMiningStakeLqtyLp, remainingLiquidityMiningLQTYOReward });

export const FarmViewProviderLqty: React.FC = props => {
  const { children } = props;
  const { liquidityMiningStakeLqtyLp, remainingLiquidityMiningLQTYOReward } = useLiquitySelector(selector);

  const [view, setView] = useState<FarmView>(
    getInitialView(liquidityMiningStakeLqtyLp, remainingLiquidityMiningLQTYOReward)
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
    if (liquidityMiningStakeLqtyLp.isZero) {
      dispatchEvent("UNSTAKE_AND_CLAIM_CONFIRMED");
    }
  }, [liquidityMiningStakeLqtyLp.isZero, dispatchEvent]);

  const provider = {
    view,
    dispatchEvent
  };

  return <FarmViewContextLp.Provider value={provider}>{children}</FarmViewContextLp.Provider>;
};
