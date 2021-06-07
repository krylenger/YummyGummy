import { createContext, useContext } from './framework';
console.log(useContext);

export const AppContext = createContext({});
export const useAppContext = () => useContext(AppContext);
