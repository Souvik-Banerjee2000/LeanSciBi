const express = require('express');
const app = express();
const mysql = require('mysql2');



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cors = require('cors');
app.use(cors());

//creating connection to db
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ReyPembert12",
    database: "charts_db",
})
//connect to db
db.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('MySql connected')
    }
})

app.get("/",(req,res) =>{
    res.sendFile(__dirname+"/index.html");
})

// let sumArray = [];
function calculateSum(data) {
    // console.log(data);
    let summedObject = {};
    let summedObjectKeys = new Set();
    let val;
    data.forEach(element => {
        for (let key in element) {
            if (!isNaN(element[key])) {
                // console.log(Number(element[key]),element[key]);
                if (!summedObjectKeys.has(key)) {
                    summedObjectKeys.add(key);
                    summedObject[key] = Number(element[key]);
                } else {
                    val = summedObject[key];
                    val += Number(element[key]);
                    summedObject[key] = val;
                }

            }
        }
    });
    return summedObject;
}
//For the dropdowns
app.get('/OrgGroup', (req, res) => {
    let sql = `
    SELECT DISTINCT OrgGroup FROM newdata
    `;
    db.query(sql, (error, result) => {
        if (error) {
            throw error;
        }else{
        const result1 = result;
        res.json(result);
        
        // let sum = " ";
        // result1.forEach( function(item){
        // // sum = sum+item.OrgGroup;
        // sumArray.push(item.OrgGroup);
        // JSON.stringify(sumArray)
        // })
        // console.log(sumArray);
        }
})
});


app.get('/MasterGroup', (req, res) => {
    let sql = `
    SELECT DISTINCT MasterGroup FROM newdata
    `;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    })
});

app.get('/AllGroup', (req, res) => {
    let sql = `
    SELECT DISTINCT AllGroup FROM newdata
    `;
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.json(result);
    })
});

//Queries
app.post("/",(req,res) => {
   
let agingGrandTotal = `\`Ageing Grand Total\``;
let lessTwoWeeks = `\`<Two weeks\``;
let greaterTwoWeeks = `\`>Two weeks\``;
let oneMonth = `\`>One Month\``;
let greaterThreeMonths = `\`>3 Months\``;

let orgsql = `select OrgGroup,SUM(${agingGrandTotal}),SUM(${lessTwoWeeks}),SUM(${greaterTwoWeeks}),SUM(${oneMonth}),SUM(${greaterThreeMonths}) from newdata
where OrgGroup IN ${req.body.OrgGroup}
and MasterGroup IN ${req.body.MasterGroup}
and AllGroup IN ${req.body.AllGroup}
group by OrgGroup`;
//FIRST ROW CHART QUERY
db.query(orgsql,(error,orgResult) => {
    
    // console.log(orgsql);
    if(error) throw error;
    let orgmastersql = `select OrgGroup,MasterGroup,SUM(${agingGrandTotal}),SUM(${lessTwoWeeks}),SUM(${greaterTwoWeeks}),SUM(${oneMonth}),SUM(${greaterThreeMonths}) from newdata
    where OrgGroup IN ${req.body.OrgGroup}
    and MasterGroup IN ${req.body.MasterGroup}
    and AllGroup IN ${req.body.AllGroup}
    group by OrgGroup,MasterGroup`;
    //SECOND ROW CHART QUERY
    db.query(orgmastersql,(error,orgMasterResult)=> {

        // console.log(orgmastersql);
        if(error) throw error;
        let orgAllGroupql = `select MasterGroup,AllGroup,SUM(${agingGrandTotal}),SUM(${lessTwoWeeks}),SUM(${greaterTwoWeeks}),SUM(${oneMonth}),SUM(${greaterThreeMonths}) from newdata
        where OrgGroup IN ${req.body.OrgGroup}
        and MasterGroup IN ${req.body.MasterGroup}
        and AllGroup IN ${req.body.AllGroup}
        group by OrgGroup,AllGroup`;
        //THIRD ROW CHART QUERY
        db.query(orgAllGroupql,(error,orgGroupResult) => {
            
            // console.log(orgAllGroupql);
            if(error) throw error;
            orgResult.push(calculateSum(orgResult));
            orgGroupResult.push(calculateSum(orgGroupResult));
            orgMasterResult.push(calculateSum(orgMasterResult));
            res.json({ 'orgData' : orgResult, 'orgMasterData' : orgMasterResult, 'orgGroupData' : orgGroupResult });
            // console.log(orgResult,orgMasterResult,orgGroupResult)
        })
    })
});
})

app.listen(5000, ()=> {
    console.log("Server is running on port 5000");
});

