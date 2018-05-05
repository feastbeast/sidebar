const generateCsvRecord = require('../../database/writeCsvFile.js');

test('generateCsvRecord return an obj', () => {
 expect(typeof generateCsvRecord(1) === 'string').toBe(true);  
});

test('the csv record is delimited by pipes |', () => {
 expect(generateCsvRecord(1).includes('|')).toBe(true);  
});

test('the csv record contains 10 fields meaning it contains 9 pipes', () => {
 var countCharOccurences = function(char, str){
     var count = 0;
     for(var i = 0; i < str.length; i += 1){
         if(str.charAt(i)===char){
          count += 1;
         }
     }
     return count;
 }
 expect(countCharOccurences("|", generateCsvRecord(1) ) === 9).toBe(true);  
});