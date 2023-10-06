import airtellogo from './Airtel-Payments-Bank-Logo-Red.png';

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
            const Datetime='26-09-2023 01:03:14 pm';
            const dynamicData = [
                { item: '2201991113/IMPS/326913319098', txn_status: 'Timeout', price: '10.00' },
                { item: '2201991113/IMPS/326913319098', txn_status: 'Timeout', price: '20.00' },
                { item: '2201991113/IMPS/326913319098', txn_status: 'Timeout', price: '30.00' }
            ];
            const totamount='60.00';
            const sampleImage = [
                [1, 0, 1, 0],
                [0, 1, 0, 1],
                [1, 0, 1, 0],
                [0, 1, 0, 1]
            ];
            function encodeImageToHex(imageData) {
                let hexString = '';
            
                for (let row = 0; row < imageData.length; row++) {
                    let byte = 0;
            
                    for (let col = 0; col < imageData[row].length; col++) {
                        // Shift the bits to the left and add the pixel value (0 or 1)
                        byte = (byte << 1) | imageData[row][col];
                    }
            
                    // Convert the byte to a two-digit hexadecimal string
                    const hexByte = byte.toString(16).toUpperCase().padStart(2, '0');
                    hexString += hexByte;
                }
            
                return hexString;
            }
            
            // Example usage:
            const logo = encodeImageToHex(sampleImage);
            const gs = '\x1D';
            const logoCommand = `${esc}*${0}${logo.length / 8}${logo}`;
            const receiptHeader =newline + centerAlign + boldOn + 'Money Transfer Receipt' + boldOff + newline + newline;
            const middle=newline + centerAlign + boldOn + 'Transaction Summary' + boldOff + newline + newline;
            const cmd = leftAlign+`Shop Name:  ${ShopName}${newline}`
                +`Beneficiary Name:  ${Benename}${newline}`
                +`Bank Name:  ${BankName}${newline}`
                +`Mobile Number:  ${mobileno}${newline}`
                +`Sender Number:  ${sendermobno}${newline}`
                + `Account Number: ${accountNumber}${newline}`
                + `Date & Time: ${Datetime}${newline}`;

            const footer=leftAlign+`Total Amount: ${boldOn}${totamount}${boldOff}${newline}`+newline
                +`*Service Charges of 1% inclusive of GST is applicable`
                +`Contact us 24*7 ${newline}Airtel Customer Dial 400 ${newline} Other Operator Subsriber Dial ${newline} 8800688006 ${newline}`
                +`Note: This is Electronically Generated Statement and does not require any Signatures`
                +newline;

                function wrapText(text, maxLength) {
                    let wrappedText = '';
                    for (let i = 0; i < text.length; i += maxLength) {
                        wrappedText += text.slice(i, i + maxLength) + '\n';
                    }
                    return wrappedText.trim(); // Remove trailing newline
                }
                // Table header
                let tableContent = tableStart;
                tableContent+=      `${tableRowStart}==============================${tableRowEnd}`;
                const tableHeader = `${tableRowStart}TID/Type/UTR  Amount  Status${tableRowEnd}`;
                tableContent+= tableHeader+`${tableRowStart}==============================${tableRowEnd}`;
                // Sample dynamic data (replace with your own data)
                const tableData = [
                    { col1: '220199110/IMPS/326913319098', col2: '10.0', col3: 'Timeout.' },
                    { col1: '220199110/IMPS/326913319098', col2: '10.0', col3: 'Timeout.' },
                    // Add more rows as needed
                ];

                // Maximum number of characters per column before inserting a line break
                const maxCharsPerColumn = 12;

                // Combine table data with formatting

                tableData.forEach(item => {
                    // Process each column item and insert line breaks as needed
                    const col1Text = wrapText(item.col1, maxCharsPerColumn);
                    const col2Text = wrapText(item.col2, maxCharsPerColumn);
                    const col3Text = wrapText(item.col3, maxCharsPerColumn);

                    const col1Lines = col1Text.split('\n');
                    const col2Lines = col2Text.split('\n');
                    const col3Lines = col3Text.split('\n');

                    // Determine the maximum number of lines in any column
                    const maxLines = Math.max(col1Lines.length, col2Lines.length, col3Lines.length);

                    // Iterate through lines and add to the table
                    for (let i = 0; i < maxLines; i++) {
                        const col1Text = col1Lines[i] || ''; // Use empty string if no more lines
                        const col2Text = col2Lines[i] || '';
                        const col3Text = col3Lines[i] || '';

                        tableContent += `${tableRowStart}${col1Text}  ${col2Text}    ${col3Text}${tableRowEnd}`;
                    }
                    tableContent+=`${tableRowStart}------------------------------${tableRowEnd}`
                });

                tableContent += tableEnd+newline;
            const data=logoCommand+newline+newline+newline;
            //receiptHeader+cmd+newline+middle+leftAlign+tableContent+footer+newline+newline;
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
