function is_defined(x) {
    return typeof x !== 'undefined';
}

function is_object(x) {
    return Object.prototype.toString.call(x) === "[object Object]";
}

function is_array(x) {
    return Object.prototype.toString.call(x) === "[object Array]";
}

var RepoAdapter = {};

// RepoAdapter.predictRiskLevelByJSON = function(data, successCB, errorCB) {
//     if (is_defined(data) && !is_array(data)) {
//         var body = data;
//         this.ajaxCall("predictRiskLevelByJSON", body, successCB, errorCB);
//     } else {
//         // Error handling
//         errorCB("Error: " + "Invalid Parameters");
//     }
// };


RepoAdapter.ajaxCall = function(operation, body, successCB, errorCB) {
    $.ajax({
        "url": repo_server_url + operation,
        "method": "POST",
        "content-Type": "application/json; charset=utf-8",
        "data": body,
        "success": function(result){
            successCB(result);
        },
        "error":  function(xhr, ajaxOptions, thrownError) {
            errorCB("Error: " + thrownError);
        }
    });
}