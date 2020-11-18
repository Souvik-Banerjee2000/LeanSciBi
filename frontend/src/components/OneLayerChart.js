import React,{useState,useEffect} from 'react'
import Chart from "react-google-charts";
import PivotChart from "./PivotChart";
// <PivotChart pivotRow={pivotData[keyIndex]} />
function OneLayerChart({totalChartData,colorArray,titles,footers,pivotData}) {
    function fixWidthHeight(index,rowData){
        if(index===0)
            return `${rowData.length * 10}px`;
        else if(index===1)
            return `${rowData.length * 10}px`;
        else if(index===2)
            return `${rowData.length * 5}px`;    
    }
    function isCaptioned(index,name){
        if(index==0){
            return name;
        }else{
            return "";
        }
    }
    useEffect(()=>{
        console.log(totalChartData);
    })
    return (
    <div>
            {Object.keys(totalChartData).map((keyName,keyIndex)=>(
                    <div key={keyIndex} style={{paddingLeft:'25px'}}>
                    <p style={{width:'50vw'}} key={keyName}>{titles[keyIndex]}</p>
                    <div style={{display:'flex',height:`18vh`,overflow:'scroll',width:'100vw',marginTop:'0px'}} key={keyIndex}>
                        {totalChartData[keyName].map((rowData,rowIndex)=>(
                            <div key={rowIndex}>
                                <Chart
                                    width={'300px'}
                                    height={fixWidthHeight(keyIndex,rowData)}
                                    chartType="BarChart"
                                    loader={<p></p>}
                                    data={rowData}
                                    key={`${keyIndex.toString() + rowIndex.toString()}`}
                                    options={{
                                        title: ``,
                                        bar:{groupWidth:`${(keyIndex+1)*33}%`} ,
                                        animation: {
                                            duration: 2000,
                                            easing: 'out',
                                            startup: true
                                        },    
                                        colors:colorArray[rowIndex]   ,
                                        legend:'none'                   
                                    }}
                                
                                />
                                <h5 key={`${keyIndex.toString() + " "+ rowIndex.toString()}`}>{footers[rowIndex]}</h5>
                            </div>

                        ))}

                    </div>
                </div>
                
    ))}
        </div>

    )
}

export default OneLayerChart;
