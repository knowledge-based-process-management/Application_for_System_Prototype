function is_defined(x) {
    return typeof x !== 'undefined';
}

function is_object(x) {
    return Object.prototype.toString.call(x) === "[object Object]";
}

function is_array(x) {
    return Object.prototype.toString.call(x) === "[object Array]";
}

var DnaAdapter = {};

DnaAdapter.progressMetricsForRiskPrediction = function(data, successCB, errorCB) {
    if (is_defined(data) && !is_array(data)) {
        var body = data;
        this.ajaxCall("QualityManagement/progressMetricsForRiskPrediction/", body, successCB, errorCB);
    } else {
        // Error handling
        errorCB("Error: " + "Invalid Parameters");
    }
};


DnaAdapter.ajaxCall = function(operation, body, successCB, errorCB) {
    $.ajax({
        "url": DnaAdapter_config.function_url + operation + body,
        "method": "GET", // This should be GET !IMPORTANT
        "content-Type": "application/json; charset=utf-8",
        "data": "",
        "beforeSend" : function (xhr) {
            xhr.setRequestHeader("Authorization", "BASIC cmVhZGVyOnFtUmVhZGVy");
            xhr.setRequestHeader("Content-Type", "application/json");
        },
        "success": function(result){
            successCB(result);
        },
        "error":  function(xhr, ajaxOptions, thrownError) {
            errorCB("Error: " + thrownError);
        }
    });
}