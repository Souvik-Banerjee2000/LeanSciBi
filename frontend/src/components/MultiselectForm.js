import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import Axios from "axios";
import MultiSelect from "react-multi-select-component";
import { ChartContext } from '../context/ChartContext';
import { ToogleContext } from '../context/ToogleContext';
const MultiselectForm = ({ endpoint, url }) => {
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState([]);
    const [switcher, setSwitcher] = useState(true);
    const { chartData, dispatch } = useContext(ChartContext);
    const { toogle, setToogle } = useContext(ToogleContext);
    const fetchEndPointData = async () => {
        const { data } = await Axios.get(url + endpoint);
        let formOptions = [];
        data.forEach(d => {
            formOptions.push({ label: d[`${endpoint}`], value: d[`${endpoint}`] });
        });
        dispatch({
            type: endpoint,
            value: formOptions
        })
        setOptions(formOptions);

    }
    const applySelectionChanges = () => {
        if (selected.length === 0) {
            dispatch({
                type: endpoint,
                value: options
            })
            setToogle(!toogle);
        } else {
            dispatch({
                type: endpoint,
                value: selected
            })
            setToogle(!toogle);
        }

    }
    useEffect(() => {
        setToogle(!toogle);
    }, [options])
    useEffect(() => {
        fetchEndPointData();
    }, [switcher])
    useEffect(() => {
        applySelectionChanges();
    }, [selected])
    return (
        <div className="selection">
            <p>{endpoint}</p>
            <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy={"Select"}
            />
        </div>
    )
}

export default MultiselectForm;
