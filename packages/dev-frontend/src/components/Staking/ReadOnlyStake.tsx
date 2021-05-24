import React, { useEffect,useState } from "react";
import { Heading, Box, Card, Flex, Button } from "theme-ui";

import { Decimal,LiquityStoreState } from "@liquity/lib-base";
import { useLiquitySelector } from "@liquity/lib-react";

import { useLiquity } from "../../hooks/LiquityContext";

import { COIN, GT } from "../../strings";

import { DisabledEditableRow, StaticRow } from "../Trove/Editor";
import { LoadingOverlay } from "../LoadingOverlay";
import { Icon } from "../Icon";

import { useStakingView } from "./context/StakingViewContext";
import { StakingGainsAction } from "./StakingGainsAction";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

const select = ({ lqtyStake, totalStakedLQTY }: LiquityStoreState) => ({
  lqtyStake,
  totalStakedLQTY
});

export const ReadOnlyStake: React.FC = () => {
  const {
    meContract,
  } = useLiquity();
  const { changePending, dispatch } = useStakingView();
  const { account } = useWeb3React<Web3Provider>();
  const { lqtyStake, totalStakedLQTY } = useLiquitySelector(select);

  const [LQTYGain, setLQTYGain] = useState<Decimal | undefined>(undefined);

  const poolShare = lqtyStake.stakedLQTY.mulDiv(100, totalStakedLQTY);
  // console.log(123123,meContract,account)
  const getPendingLQTYGain = () => {
    meContract.lqtyStaking.getPendingLQTYGain(account).then((res:any) => {
      setLQTYGain(Decimal.fromBigNumberString(res))
    })
  }

  useEffect(() => {
    getPendingLQTYGain();
  },[])

  return (
    <Card>
      <Heading>Staking</Heading>

      <Box sx={{ p: [2, 3] }}>
        <DisabledEditableRow
          label="Stake"
          inputId="stake-lqty"
          amount={lqtyStake.stakedLQTY.prettify()}
          unit={GT}
        />

        <StaticRow
          label="Pool share"
          inputId="stake-share"
          amount={poolShare.prettify(4)}
          unit="%"
        />

        <StaticRow
          label="Redemption gain"
          inputId="stake-gain-eth"
          amount={lqtyStake.collateralGain.prettify(4)}
          color={lqtyStake.collateralGain.nonZero && "success"}
          unit="FTM"
        />

        <StaticRow
          label="Issuance gain"
          inputId="stake-gain-lusd"
          amount={lqtyStake.lusdGain.prettify(4)}
          color={lqtyStake.lusdGain.nonZero && "success"}
          unit={COIN}
        />

        <StaticRow
          label="AQU transaction gain"
          inputId="stake-gain-aqu"
          amount={LQTYGain?LQTYGain.prettify(4):'0.00'}
          color={LQTYGain&&LQTYGain.nonZero && "success"}
          unit='AQU'
        />

        <Flex variant="layout.actions">
          <Button variant="outline" onClick={() => dispatch({ type: "startAdjusting" })}>
            <Icon name="pen" size="sm" />
            &nbsp;Adjust
          </Button>

          <StakingGainsAction LQTYGain={LQTYGain} />
        </Flex>
      </Box>

      {changePending && <LoadingOverlay />}
    </Card>
  );
};
