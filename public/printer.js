//import airtellogo from './Airtel-Payments-Bank-Logo-Red.png';

export function thermalReceipt() {
    navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['e7810a71-73ae-499d-8c15-faa9aef0c3f2'] // The service UUID you provided
    })
        .then(device => {
            console.log('Device discovered', device.name);
            return device.gatt.connect();
        })
        .then(server => {
            console.log('Getting Service...');
            return server.getPrimaryService('e7810a71-73ae-499d-8c15-faa9aef0c3f2');
        })
        .then(service => {
            console.log('Getting Characteristic...');
            return service.getCharacteristic('bef8d6c9-9c21-4c9e-b632-bd58c1009f9f');
        })
        .then(characteristic => {
            console.log('All ready!');
            const esc = '\x1B';
            const newline = '\x0A';
            const centerAlign= '\x1B\x61\x01';
            const leftAlign= '\x1b\x61\x00'; // Left justification
            const boldOn='\x1B\x45\x01';
            const boldOff= '\x1B\x45\x00';
            const tableStart = esc + 't' + '\x00'; // Start table
            const tableEnd = esc + 't' + '\x00';   // End table (same as start)
            const tableRowStart = '';               // Row start (customize as needed)
            const tableRowEnd = newline; 




            const ShopName = 'Airtel 5G';
            const accountNumber = '1234567890';
            const BankName = 'CANARA BANK';
            const mobileno= '8400572904';
            const sendermobno= '9838637483';
            const Benename='Mradul';
            const Datetime='26-09-2023 01:03:14 pm'
            const dynamicData = [
                { item: 'Item 1', txn_status: 'Timeout', price: '10.00' },
                { item: 'Item 2', txn_status: 'Timeout', price: '20.00' },
                { item: 'Item 3', txn_status: 'Timeout', price: '30.00' }
            ];
            const totamount='60.00';


            const receiptHeader =airtellogo+newline + centerAlign + boldOn + 'Money Transfer Receipt' + boldOff + newline + newline;
            const middle=newline + centerAlign + boldOn + 'Transaction Summary' + boldOff + newline + newline;
            const cmd = leftAlign+`Shop Name:  ${ShopName}${newline}`
                +`Beneficiary Name:  ${Benename}${newline}`
                +`Bank Name:  ${BankName}${newline}`
                +`Mobile Number:  ${mobileno}${newline}`
                +`Sender Number:  ${sendermobno}${newline}`
                + `Account Number: ${accountNumber}${newline}`
                + `Date & Time: ${Datetime}${newline}`;
            const footer=leftAlign+`Total Amount: ${totamount}${newline}`
                +`*Service Charges of 1% inclusive of GST is applicable`
                +`Contact us 24*7 ${newline}Airtel Customer Dial 400 ${newline} Other Operator Subsriber Dial ${newline} 8800688006 ${newline}`
                +`Note: This is Electronically Generated Statement and does not require any Signatures`
                +newline;

            //table
            let tableData = tableStart;
            function createCellWithGrid(content, width) {
                const cellContent = content.padEnd(width - 2); // Adjust width and padding as needed
                return `|${cellContent} `;
            }

            tableData += `${tableRowStart}+----------+---------+---------+${tableRowEnd}`;
            tableData += `${tableRowStart}| Item     | Status  | Price   |${tableRowEnd}`;
            tableData += `${tableRowStart}+----------+---------+---------+${tableRowEnd}`;

            
            dynamicData.forEach(item => {
                const itemCell = createCellWithGrid(item.item, 10); // Adjust cell width as needed
                const status = createCellWithGrid(item.txn_status, 10); // Adjust cell width as needed
                const prices = createCellWithGrid(item.price, 10); // Adjust cell width as needed
                tableData += leftAlign+`${tableRowStart}${itemCell}${status}${prices}${tableRowEnd}`;
            });
            tableData += tableEnd;


            const data=receiptHeader;
            let encoder = new TextEncoder('utf-8');



            var maxChunk = 500;
            var j = 0;
            console.log(data);
            console.log(data.length);
            if ( data.length > maxChunk ) {
                for ( var i = 0; i < data.length; i += maxChunk ) {
                  var subStr;
                  if ( i + maxChunk <= data.length ) {
                    subStr = data.substring(i, i + maxChunk);
          
                  } else {
                    subStr = data.substring(i, data.length);
                  }
          
                  setTimeout(writeStrToCharacteristic, 250 * j, subStr);
                  j++;
                }
              } else {
                writeStrToCharacteristic(data);
              }
          
              function writeStrToCharacteristic (str) {
                let endata = encoder.encode(str);
                return characteristic.writeValue(endata);
              }
        })
        .catch(error => {
            console.log('Something went wrong: ' + error);
        });
};
