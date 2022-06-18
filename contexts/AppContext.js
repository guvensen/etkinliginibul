import { createContext } from "react";


export const AppContext = createContext({});

export function ContextProvider ({children}){
    let sharedState = {

    }

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    )
}