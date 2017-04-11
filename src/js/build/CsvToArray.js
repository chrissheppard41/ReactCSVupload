/**
 * CsvToArray
 *
 * Converts a CSV value into a array of objects
 *
 * @author Chris Sheppard
 * @param csv
 * @returns {Array}
 * @constructor
 */
function CsvToArray(csv){
    var lines=csv.split("\n");
    var result = [];
    var headers=lines[0].split(",");

    //first loop, loop through the lines
    for (var i=1;i<lines.length;i++){
        //set a default object to store the values
        var obj = {};
        //split the lines data
        //todo: What if there is a ',' in the replaced value, look at this later
        var currentline = lines[i].split(",");

        //second loop, set the values into the object using the header as a key
        for(var j=0;j<headers.length;j++){
            //trim the header value, else you'll have a new line at the end
            var key = headers[j].trim();
            //set the value
            obj[key] = currentline[j].trim();
        }

        //push the object to the result array
        result.push(obj);
    }

    //return result; //JavaScript object
    return result; //JSON
}
module.exports = CsvToArray;