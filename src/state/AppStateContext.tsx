import { createContext, useContext } from "react";
import { usePageState } from "./usePageState";
import { Page } from "../utils/types";
type AppStateContextType = ReturnType<typeof usePageState>;

const AppStateContext = createContext<AppStateContextType>({} as AppStateContextType);

type appStateProviderProps = {
    children: React.ReactNode;
    initialState: Page;
}

export const AppStateProvider = ({ children, initialState }: appStateProviderProps) => {
    const pageStateHandlers = usePageState(initialState);
    return <AppStateContext.Provider value={pageStateHandlers}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => {
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error("useAppState must be used within a AppStateProvider");
    }
    return context;
}