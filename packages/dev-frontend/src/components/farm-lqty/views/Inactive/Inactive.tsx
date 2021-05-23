import React, { useCallback } from "react";
import { Card, Heading, Box, Flex, Button, Link, Paragraph } from "theme-ui";
import { useLiquity } from "../../../../hooks/LiquityContext";
import { Icon } from "../../../Icon";
import { InfoMessage } from "../../../InfoMessage";
import { useFarmViewLp } from "../../context/FarmViewContext";
import { RemainingLQTY } from "../RemainingLQTY";
import { Yield } from "../Yield";

const uniLink = (lusdAddress: string) => `https://app.sushi.com/add/FTM/${lusdAddress}`;

export const Inactive: React.FC = () => {
  const { dispatchEvent } = useFarmViewLp();

  const {
    liquity: {
      connection: { addresses }
    }
  } = useLiquity();

  const handleStakePressed = useCallback(() => {
    dispatchEvent("STAKE_PRESSED");
  }, [dispatchEvent]);

  return (
    <Card>
      <Heading>
      Sushi Liquidity Farm
        <Flex sx={{ justifyContent: "flex-end" }}>
          <RemainingLQTY />
        </Flex>
      </Heading>
      <Box sx={{ p: [2, 3] }}>
        <InfoMessage title="You aren't farming AQU.">
          <Paragraph>You can farm AQU by staking your Fantom FTM/AQU LP tokens.</Paragraph>

          <Paragraph sx={{ mt: 2 }}>
            You can obtain LP tokens by adding liquidity to the{" "}
            <Link href={uniLink(addresses["lqtyToken"])} target="_blank">
            FTM/AQU pool on Sushi. <Icon name="external-link-alt" size="xs" />
            </Link>
          </Paragraph>
        </InfoMessage>

        <Flex variant="layout.actions">
          <Flex sx={{ justifyContent: "flex-start", alignItems: "center", flex: 1 }}>
            <Yield />
          </Flex>
          <Button onClick={handleStakePressed}>Stake</Button>
        </Flex>
      </Box>
    </Card>
  );
};
