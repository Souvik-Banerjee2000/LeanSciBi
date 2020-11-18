import React, { createContext, useState, useReducer } from "react";
export const ToogleContext = createContext();

const ToogleContextProvider = (props) => {
    const [toogle, setToogle] = useState(true);
    return (
        <ToogleContext.Provider value={{ toogle, setToogle }}>
            {props.children}
        </ToogleContext.Provider>
    )
}
export default ToogleContextProvider;