const fs = require('fs');
const path = require('path');
const dir_path = __dirname + "\\output";
/**
 *
 * CreateFile
 *
 * Create the file in the directory to be used later. Reads the file from disk, updates that file then saves that file
 * to a different directory so that we don't lose the original content
 *
 * @param path_to_file
 * @param request
 * @returns {{}}
 * @constructor
 */
function CreateFile (path_to_file, request) {
    var output = {};
    var created = "fail";
    var file_content = fs.readFileSync(path_to_file, 'utf8').toString();

    var update = UpdateFile(request.fieldToUpdate, request.oldValue, request.newValue, file_content);

    var file_path = dir_path + request.url;
    var strict_path = file_path.substring(0, file_path.lastIndexOf("/"));
    if (!fs.existsSync(strict_path)) {
        fs.mkdirSync(strict_path);
    }

    fs.writeFileSync(file_path, update.data.updated, 'utf8');

    if (fileExists(file_path)) {
        created = "pass";
    }

    output = request;
    output.status = created;
    output.original = escapeStringForCSV(update.data.original.toString());
    output.updated = escapeStringForCSV(update.data.updated.toString());
    output.error = update.error;

    return output;
}
/**
 *
 * Escapes the markdown file
 *
 * @param input
 * @returns {string}
 */
function escapeStringForCSV (input) {
    var output = input.replace(/"/g, '""');
    return output;
}

/**
 * fileExists
 *
 * If the file exists after it gets created
 *
 * @param path
 * @returns {boolean}
 */
function fileExists (dir) {
    var file_exists = true;

    if(!fs.existsSync(dir)) {
        file_exists = false;
    }

    return file_exists;
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
function UpdateFile (fieldToUpdate, oldValue, newValue, data) {
    var output = {
        error: null,
        data: {
            original: data,
            updated: ""
        }
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
 * DeleteOutput
 *
 * Deletes the files and folders recursively in sync
 *
 * @param dir
 * @constructor
 */
function DeleteOutput (dir) {
    if(dir === "") {
        dir = dir_path;
    }

    if(fileExists (dir)) {
        var list = fs.readdirSync(dir);
        for(var i = 0; i < list.length; i++) {
            var filename = path.join(dir, list[i]);
            var stat = fs.statSync(filename);

            if(filename == "." || filename == "..") {
                // pass these files
            } else if(stat.isDirectory()) {
                // rmdir recursively
                DeleteOutput(filename);
            } else {
                // rm fiilename
                fs.unlinkSync(filename);
            }
        }
        //don't delete the output root
        if(dir !== dir_path) {
            fs.rmdirSync(dir);
        }
    }

}

function ReadDir(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) results = results.concat(ReadDir(file));
        else results.push(file);
    });
    return results;
}

function RemoveCamelCase(variable, path_to_file) {
    var file_content = fs.readFileSync(path_to_file, 'utf8').toString();
    var reg = new RegExp(variable + "(.*)");

    var res = file_content.match(reg);

    file_content = file_content.replace(res[0], (str) => {
        var split = str.split(": ");
        var upperFirstChar = split[1].charAt(0).toUpperCase() + split[1].toLowerCase().slice(1);
        return split[0] + ": " + upperFirstChar;
    });

    fs.writeFileSync(path_to_file, file_content, 'utf8');
}

module.exports = {
    CreateFile: CreateFile,
    DeleteOutput: DeleteOutput,
    ReadDir: ReadDir,
    RemoveCamelCase: RemoveCamelCase
};