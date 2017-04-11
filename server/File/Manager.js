const fsp = require('fs-promise');

/**
 *
 * ReadFile
 *
 * Reads the file from disk
 *
 * @param path
 * @param callback
 * @returns {*}
 * @constructor
 */
function ReadFile(path, callback) {
    return fsp.readFile(path, 'utf8');
}

/**
 *
 * UpdateFile
 *
 * From the values set in the request, update the markdown file from the before to the new value
 *
 * @param fieldToUpdate
 * @param oldValue
 * @param newValue
 * @param data
 * @returns {{error: null, data: {original: *, updated: string}}}
 * @constructor
 */
function UpdateFile(fieldToUpdate, oldValue, newValue, data) {
    var output = {
        error: null,
        data: {
            original: data,
            updated: ""
        },
    };

    if(data.indexOf(fieldToUpdate)) {
        const regSearch = new RegExp(fieldToUpdate + '\\:\\s?(' + oldValue + ')', 'gmi');
        const replace_with = fieldToUpdate + ": " + newValue;

        const match = data.match(regSearch);
        if (match !== null) {
            //update value
            output.data.updated = data.replace(regSearch, replace_with);
        } else {
            output.error = "Regex did not match anything";
        }
    } else {
        output.error = "The field you wish to update does not exist";
    }

    return output;
}
/**
 *
 * WriteFile
 *
 * Writes the file to disk
 *
 * @param path
 * @param data
 * @returns {*}
 * @constructor
 */
function WriteFile(path, data) {
    return fsp.writeFile(path, data);
}

module.exports = {
    ReadFile: ReadFile,
    UpdateFile: UpdateFile,
    WriteFile: WriteFile
};