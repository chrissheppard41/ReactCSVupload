import jQuery from "jquery";
/**
 * The master module for the Ajax service
 * @param  String _url  the url used in this request
 * @param  String _type the type of request (Json/HTML/XML etc)
 * @param  String _name the name of the module calling this class
 * @return Json			 The class public objects
 */
function Ajax(url, type, name) {

    var requestType = "GET",
        contentType = type,
        data = null;
    return {
        /**
         * setType sets the type of ajax call
         * @param String _type for Post calls
         */
        setType: function (type) {
            requestType = type;
        },
        /**
         * setContentType sets the content type of the ajax call
         * @param String _type for Post calls
         */
        setContentType: function (type) {
            contentType = type;
        },
        /**
         * setData sets the data of the request
         * @param Object _dataType contains the type of body request
         * @param Object _data contains the request body
         */
        setData: function (indata) {
            data = indata;
        },
        /**
         * exec makes an ajax request to a API endpoint provided by the server or a simple file
         * @param success_cb
         * @param error_cb
         * @return promise       contains the call to the parent "then" function
         */
        exec: function (success_cb, error_cb) {
            //return the ajax promise, will hit the error method if no url has been set, else the sucess will call,
            //once finished the done command is made

            if (typeof success_cb !== "function") {
                success_cb = function (response, status, jqXHR) {
                    console.log("INFO :: " + name + " :: Successful fetch of the feed");
                };
            }

            if (typeof error_cb !== "function") {
                error_cb = function (response, status, jqXHR) {
                    console.log("ERROR :: " + name + " :: Error when fetching of the feed");
                };
            }
            var call = {
                url: url,
                dataType: type,
                async: true,
                type: requestType,
                data: data,
                contentType: "application/" + contentType,
                headers: {
                    "Cache-Control": "public, max-age=0"
                },
                success: success_cb,
                error: error_cb
            };

            return jQuery.when(
                jQuery.ajax(call)
            ).done(function (a_call) {
                console.log("INFO :: " + name + " :: Done with the call to the feed", a_call);
            });
        }
    };
}

module.exports = Ajax;