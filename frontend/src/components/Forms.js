
import React from 'react'
import MultiselectForm from './MultiselectForm'
function Forms() {
    const url = "http://127.0.0.1:5000/";
    return (
        <div style={{display:'flex',justifyContent:'space-evenly'}}>
            <MultiselectForm endpoint="OrgGroup" url={url} />
            <MultiselectForm endpoint="MasterGroup" url={url} />
            <MultiselectForm endpoint="AllGroup" url={url} />
        </div>
    )
}

export default Forms;
