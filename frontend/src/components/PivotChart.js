import React,{useState,useEffect} from 'react'

function PivotChart(pivotRow) {
    useEffect(()=>{
        console.log(pivotRow.pivotRow);
    })
    return (
        <div>
            <table>
            <tbody>
                {
                    pivotRow.pivotRow.map((row, index)=>(
                        <tr key={index}>
                            <td key={0}>{row[0]}</td>
                            <td key={1}>{row[1]}</td>
                        </tr>
                    ))
                }
            </tbody>
            </table>
        </div>
    )
}

export default PivotChart
