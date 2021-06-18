import React, { useEffect, useState } from "react";
import { Card, Paragraph, Text } from "theme-ui";
import { Decimal, LiquityStoreState } from "@liquity/lib-base";
import { useLiquitySelector } from "@liquity/lib-react";
import { InfoIcon } from "../../InfoIcon";
import { useLiquity } from "../../../hooks/LiquityContext";
import { Badge } from "../../Badge";
import { fetchPrices } from "../context/fetchPrices";
import { ethers } from "ethers";

const selector = ({
  remainingLiquidityMiningLQTYReward,
  totalStakedUniTokens
}: LiquityStoreState) => ({
  remainingLiquidityMiningLQTYReward,
  totalStakedUniTokens
});

export const Yield: React.FC = () => {
  const {
    meContract,
    liquity: {
      connection: { addresses, liquidityMiningLQTYRewardRate }
    }
  } = useLiquity();

  const { remainingLiquidityMiningLQTYReward, totalStakedUniTokens } = useLiquitySelector(selector);
  const [lqtyPrice, setLqtyPrice] = useState<Decimal | undefined>(undefined);
  const [uniLpPrice, setUniLpPrice] = useState<Decimal | undefined>(undefined);
  const hasZeroValue = remainingLiquidityMiningLQTYReward.isZero || totalStakedUniTokens.isZero;
  const lqtyTokenAddress = addresses["lqtyToken"];
  const uniTokenAddress = addresses["uniToken"];
  const secondsRemaining = remainingLiquidityMiningLQTYReward.div(liquidityMiningLQTYRewardRate);
  const daysRemaining = secondsRemaining.div(60 * 60 * 24);
  
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { lqtyPriceUSD, uniLpPriceUSD } = await fetchPrices(lqtyTokenAddress, uniTokenAddress);
  //       setLqtyPrice(lqtyPriceUSD);
  //       setUniLpPrice(uniLpPriceUSD);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  // }, [lqtyTokenAddress, uniTokenAddress]);

  useEffect(() => {
    meContract.contractEth.getAmountsOut(ethers.utils.parseUnits('1',18),[lqtyTokenAddress,'0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83','0x04068da6c83afcfa0e13ba15a6696662335d5b75']).then((res:any) => {
      setLqtyPrice(Decimal.from(ethers.utils.formatUnits(res[2], 6)))
    })

    meContract.contractEth.getAmountsOut(ethers.utils.parseUnits('1',18),['0x41e3dF7f716aB5AF28c1497B354D79342923196a','0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83','0x04068da6c83afcfa0e13ba15a6696662335d5b75']).then((res:any) => {
     
      const fusdPrice = Decimal.from(ethers.utils.formatUnits(res[2], 6));
      // setLqtyPrice(Decimal.fromBigNumberString(res[2]))
      meContract.contractCakeLp.totalSupply().then((res: any) => {
        const totalSupply = Decimal.fromBigNumberString(res);
      
        meContract.contractCakeLp.getReserves().then((res: any) => {
          const fusdNum = Decimal.fromBigNumberString(res[1]);
          const fu = fusdPrice.mul(fusdNum);
          const total = fu.mul(2);
          setUniLpPrice(total.div(totalSupply))
        })
      })
    })
  }, [lqtyTokenAddress]);

  if (hasZeroValue|| lqtyPrice === undefined || uniLpPrice === undefined) return null;

  const remainingLqtyInUSD = remainingLiquidityMiningLQTYReward.mul(lqtyPrice);
  const totalStakedUniLpInUSD = totalStakedUniTokens.mul(uniLpPrice);
  const yieldPercentage = remainingLqtyInUSD.div(totalStakedUniLpInUSD).mul(100);

  if (yieldPercentage.isZero) return null;

  return (
    <Badge>
      <Text>
        {daysRemaining?.prettify(0)} day yield {yieldPercentage.toString(2)}%
      </Text>
      <InfoIcon
        tooltip={
          <Card variant="tooltip" sx={{ minWidth: ["auto", "352px"] }}>
            <Paragraph>
              An <Text sx={{ fontWeight: "bold" }}>estimate</Text> of the AQU return on staked SUSHI
              LP tokens. The farm runs for 6-weeks, and the return is relative to the time remaining.
            </Paragraph>
            <Paragraph sx={{ fontSize: "12px", fontFamily: "monospace", mt: 2 }}>
              ($AQU_REWARDS / $STAKED_SUSHI_LP) * 100 ={" "}
              <Text sx={{ fontWeight: "bold" }}> Yield</Text>
            </Paragraph>
            <Paragraph sx={{ fontSize: "12px", fontFamily: "monospace" }}>
              ($
              {remainingLqtyInUSD.shorten()} / ${totalStakedUniLpInUSD.shorten()}) * 100 =
              <Text sx={{ fontWeight: "bold" }}> {yieldPercentage.toString(2)}%</Text>
            </Paragraph>
          </Card>
        }
      ></InfoIcon>
    </Badge>
  );
};
