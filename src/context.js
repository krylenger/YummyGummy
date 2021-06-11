import { createContext, useContext } from 'react';

export const GoalContext = createContext({});
export const useGoalContext = () => useContext(GoalContext);

export const MagicFridgeItemsContext = createContext({});
export const useMagicFridgeItemsContext = () => useContext(MagicFridgeItemsContext);
