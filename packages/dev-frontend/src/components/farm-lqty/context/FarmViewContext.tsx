import { createContext, useContext } from "react";
import type { FarmView, FarmEvent } from "./transitions";

type FarmViewContextTypeLp = {
  view: FarmView;
  dispatchEvent: (event: FarmEvent) => void;
};

export const FarmViewContextLp = createContext<FarmViewContextTypeLp | null>(null);

export const useFarmViewLp = (): FarmViewContextTypeLp => {
  const context: FarmViewContextTypeLp | null = useContext(FarmViewContextLp);

  if (context === null) {
    throw new Error("You must add a <FarmViewProvider> into the React tree");
  }

  return context;
};
