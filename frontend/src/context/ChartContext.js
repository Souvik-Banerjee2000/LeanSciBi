import React, { createContext, useState, useReducer } from "react";
import { ChartReducer } from "../reducer/ChartReducer"
export const ChartContext = createContext();

const ChartContextProvider = (props) => {
    const [chartData, dispatch] = useReducer(ChartReducer, {
        OrgGroup: [],
        MasterGroup: [],
        AllGroup:[]
    });
    return (
        <ChartContext.Provider value={{ chartData, dispatch }}>
            {props.children}
        </ChartContext.Provider>
    )
}
export default ChartContextProvider;