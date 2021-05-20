import { Container } from "theme-ui";
import { SystemStats } from "../components/SystemStats";
import { Farm as FarmPanel } from "../components/Farm/Farm";
import { Farm as FarmPanelLqty } from "../components/farm-lqty/Farm";

export const Farm: React.FC = () => (
  <Container variant="columns" sx={{ justifyContent: "flex-start" }}>
    <Container variant="left">
      <FarmPanel />
      <FarmPanelLqty/>
    </Container>

    <Container variant="right">
      <SystemStats />
    </Container>
  </Container>
);
