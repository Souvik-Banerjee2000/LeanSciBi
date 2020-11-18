import React,{useState,useEffect,useContext} from "react";
import OneLayerChart from "./OneLayerChart";
import { ToogleContext } from '../context/ToogleContext';
function Body({bodyData}){

    const [allRowChartData,setAllRowChartData] = useState({});
    const [pivotData,setPivotData] = useState([]);
    const [switcher,setSwitcher] = useState(false);
    
    //Key = 'Sum()', currentRowName = [OrgGroup,AllGroup], currentData = orgData
    function prepareDataByKey(key,currentRowName,currentData){
        let chartData = [];
        let temp = [];
        let currRowName = '';
        // console.log(currentRowName,key);
        //Pushing the headers
        currentRowName.forEach(rowName=>{
            currRowName+=rowName.toString();
        });
        temp.push(currRowName)
        temp.push(key);
        temp.push({ role: 'annotation' })
        chartData.push(temp);
        //Header pushing ends => [[Sum(),OgrGroup,AllGroup]]
        //Pushing the last entry (Sum entry) for the given key
        temp = [];
        currRowName="";
        currRowName+="Grand Total";    
        temp.push(currRowName);
        currentData[currentData.length - 1][key] !== null ? temp.push(Number(currentData[currentData.length - 1][key])) : temp.push(1);
        currentData[currentData.length - 1][key] !== null ? temp.push(Number(currentData[currentData.length - 1][key])) : temp.push(1);
        chartData.push(temp);
        //Last entry Pushing ends
        //Pushing all the remaining entries
        for(let index = 0;index<currentData.length-1;index++){
            temp = [];
            currRowName ='';
            currentRowName.forEach(rowName => {
                currRowName+=currentData[index][rowName]
                currRowName+=" ";
            })
            temp.push(currRowName);
            currentData[index][key]!==null ? temp.push(Number(currentData[index][key])):temp.push(1);
            currentData[index][key] !== null ? temp.push(Number(currentData[index][key])) : temp.push(1);
            chartData.push(temp);
        }
        //Remaining entry pushing ends
        return chartData;
    }
    function prepareCurrentRowName(currRowName) {
        let keys = [];
        let strKey;
        for (let key in currRowName) {
            strKey = key.toString();
            if (!strKey.includes('SUM')) {
                keys.push(strKey);
            }
        }
        if(keys.length===1){
            keys = [keys[0],""]
        }
        return keys;
    }
    function preparePivotData(dataRow,independentKey,dependentKey){ 
        //dataRow Array from that each row can be prepared 
        //independentKeyValue = "OrgGroup"
        //dependentKeyValue = "MasterGroup"
        // console.log(dataRow);
        let keyValue = [];
        let currentIndependentKeyValue =  dataRow[0][independentKey]; 
        let currentDependentKeyValue;
        dataRow[0][dependentKey]!==undefined ?currentDependentKeyValue = dataRow[0][dependentKey]:currentDependentKeyValue="";
        dataRow.forEach(function(data,index){
            
            // console.log(data[dependentKey]);
            
            // console.log(data);
        if(index!==0){
            if(currentIndependentKeyValue === data[independentKey] ){
                currentDependentKeyValue += "\n";
                currentDependentKeyValue+=data[dependentKey];
                

            }else{
                keyValue.push([currentIndependentKeyValue,currentDependentKeyValue])
                currentDependentKeyValue = "";
                currentIndependentKeyValue = data[independentKey];
            }
        }
            // currentIndependentKey = data[keys[currentCounter]]
        })
        // keyValue.splice(1, keyValue.length - 1);
        // keyValue.unshift([independentKey,dependentKey])
        return keyValue.splice(0,keyValue.length-1);
    }
    function prepareDataByRow(bodyData){
        let summedObj; 
        let totalBodyKeyData;
        let totalChartObj = {};
        let currentRowName;
        let independentKey;
        let dependentKey;
        let allPivotData = [];
        let currentPivotData;
        for(let bodyKey in bodyData){
            totalBodyKeyData = [];
            summedObj = bodyData[bodyKey][bodyData[bodyKey].length - 1]; 
            independentKey = prepareCurrentRowName(bodyData[bodyKey][0])[0];
            dependentKey = prepareCurrentRowName(bodyData[bodyKey][0])[1];
            // console.log(prepareCurrentRowName(bodyData[bodyKey][0]));
            currentPivotData = preparePivotData(bodyData[bodyKey],independentKey,dependentKey);
            currentPivotData.unshift([independentKey,dependentKey]);
            allPivotData.push(currentPivotData);
            // currentPivotData.shift();
            
            // currentRowName = prepareCurrentRowName(bodyData[bodyKey][0]);
            if(bodyKey==='orgData')
                currentRowName=['OrgGroup'];
            else if(bodyKey==='orgMasterData')
                currentRowName=['MasterGroup']    
            else if(bodyKey==='orgGroupData'){
                currentRowName=['AllGroup']
            }    
            for (let key in summedObj) {
                totalBodyKeyData.push(prepareDataByKey(key,currentRowName,bodyData[bodyKey]))
                totalChartObj[bodyKey] = totalBodyKeyData;
            }

        }
        setPivotData(allPivotData);
        return totalChartObj;
    }
    function isEmptyObject(obj){
        return !Object.keys(obj).length
    }
    useEffect(()=>{
        if(!isEmptyObject(bodyData)){
            // console.log(bodyData);
            let chartData = prepareDataByRow(bodyData);
            // console.log(chartData);
            setAllRowChartData(chartData);
        }
    },[bodyData])

    useEffect(()=>{
        let chartData = prepareDataByRow(bodyData);
        setAllRowChartData(chartData);
    },[switcher])

    return(
        <div>
            {isEmptyObject(allRowChartData) ? <h1>Loading...</h1> : (<OneLayerChart totalChartData={allRowChartData} colorArray={[['#5500FF'], ['#59A14F'], ['#EDC948'], ['#F28E2B'], ['#E15759']]} footers={["Ageing Grand Total", "<Two Weeks", ">Two Weeks", ">One Month", ">3 Months"]} titles={["Organizational Group Level Ageing Summary", "Master Group Level Ageing Summary","Group Level Ageing Summary"]} pivotData={pivotData} />)}
        </div>
    )
}
export default Body;

