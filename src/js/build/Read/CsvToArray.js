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
let outputArr = [];
function CsvToArray(csv){
    var lines=csv.split("\n");
    var result = [];
    var headers=lines[0].split(",");

    //first loop, loop through the lines
    for (var i=1; i<lines.length; i++) {
        //set a default object to store the values
        var obj = {};
        //split the lines data
        //todo: What if there is a ',' in the replaced value, look at this later
        //var currentline = lines[i].split(",");
        parseLine(lines[i]);
        var currentline = outputArr;

        if(currentline[0] !== undefined) {
            //second loop, set the values into the object using the header as a key
            for (var j=0; j<headers.length; j++) {
                //trim the header value, else you'll have a new line at the end
                var key = headers[j].trim();
                //set the value
                obj[key] = currentline[j].trim();
            }
            obj["status"] = "ready";
            obj["original"] = "";
            obj["updated"] = "";
            obj["error"] = "";


            //push the object to the result array
            result.push(obj);
        }
    }

    //return result; //JavaScript object
    return result; //JSON
}
function parseLine(line) {
    outputArr = [];
    performAction(0, ",", line);
}

let counter = 0;

function performAction(startAt, breakAt, section) {
    var string = "";
    var startedWithQuote = false;
    var currentpos = 0;

    counter++;

    if(counter === 5) {
        return ;
    }

    if(startAt <= (section.length - 1)) {
        for (var i = startAt; i < section.length; i++) {
            currentpos = i;
            if(section.charAt(i) === '"') {
                startedWithQuote = true;
            }
            if(startedWithQuote) {
                if(section.charAt(i) === breakAt && section.charAt(i - 1) === '"') {
                    break;
                }
            } else {
                if(section.charAt(i) === breakAt) {
                    break;
                }
            }

            string += section.charAt(i);
        }
        outputArr.push(string.replace(/"/g, ""));

        performAction((currentpos + 1), ",", section);
    }

}
module.exports = CsvToArray;