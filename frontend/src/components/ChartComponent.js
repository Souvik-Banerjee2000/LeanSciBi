import React, { useContext, useEffect, useState } from 'react';
import Charts from "./Charts";
import { ChartContext } from '../context/ChartContext';
import { ToogleContext } from '../context/ToogleContext';
function ChartComponent() {
    const { chartData, dispatch } = useContext(ChartContext);
    const { toogle, setToogle } = useContext(ToogleContext);
    const [readyToRenderChart, setReadyToRenderChart] = useState(false);
    useEffect(() => {
        let isPlotable = true;
        for (let key in chartData) {
            if (chartData[key].length === 0) {
                isPlotable = false;
                break;
            }
        }
        if (isPlotable)
            setReadyToRenderChart(isPlotable);
    }, [toogle])
    return (
        <div>
            {!readyToRenderChart ? (<h1>Loading...</h1>) : (<Charts/>)}
        </div>
    )
}

export default ChartComponent
