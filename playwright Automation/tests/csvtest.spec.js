const { test, expect } = require('@playwright/test');
const fs = require('fs');
const fastcsv = require('fast-csv');
const moment = require('moment');

test.only("CSV Test", async () => {
  let myObject = new Promise((resolve) => {
    let dataArray = [];
    let lineCount = 0;

    const stream = fs.createReadStream("tests/csv/Billing_Reports_6.csv");
    stream.pipe(fastcsv.parse({ headers: true }))
      .on("data", (data) => {
        if (Object.keys(data).length > 0) {
          dataArray.push(data);
        }
        lineCount++;
      })
      .on("end", () => {
        const trimmedDataArray = dataArray.slice(0, Math.max(0, dataArray.length - 5)); // Remove the last five rows
        resolve(trimmedDataArray);
      });
  });

  let output = await myObject;
 const mapArr=()=>{
if(Array.isArray(output)&&output?.length){
return output.map((record)=>{


    // Check if Report Month and Date of Enrollment are in the same month
       const reportMonth = 1 + moment(record['Report Month']).month();
       const enrollmentMonth = 1 + moment(record['Date of Enrollment']).month();
       const isSameMonth = reportMonth === enrollmentMonth;

      // Check the value of 99453* based on the condition
      if (isSameMonth) {
        record[' 99453*'] = '1'; // Assign the value 1 to ' 99453*'
      }
      
      let is99453One=record[' 99453*']==='1'
      console.log(record["First Name"],
                  record['Last Name'], 
                  `Report Month: ${reportMonth}, 
                  Enrollment Month: ${enrollmentMonth}, 
                  99453*: ${is99453One}`);
    
      // Check the value of 99454* if user spent more then 16 days on device or not 

      const daysSpent = parseInt(record['Days Spent on device']);
      const is99454One = record[' 99454*'] === '1';
      // Check the value of 99454* based on the condition
      if (daysSpent > 16 && is99454One) {
        
        console.log(record["First Name"],
                    record['Last Name'],
                    `-----------Days Spent: ${daysSpent}, 
                    99454*: ${record[' 99454*']}`);
      }

      //Check the value of 99547* based on time spent 
      const [hours,minutes,seonds] = record['Time Spent (h:m:s)'].split(':').map(Number);
      let accminuts = hours *60 + minutes + seonds;

      if (accminuts > 60 && record[' 99548*'] === '2') {
        console.log("Report is double addendumed");
      } else if (accminuts > 40) {
        console.log("Report is addendumed");
      } else if (accminuts > 20) {
        console.log("Report is able to sign");
      } else {
        console.log("Report didn't meet the conditions to sign");
      }

return {
    ...record,
}    
})
}
 }
 mapArr()
  });
