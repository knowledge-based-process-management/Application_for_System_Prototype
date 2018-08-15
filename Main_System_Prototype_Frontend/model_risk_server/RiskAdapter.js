function is_defined(x) {
    return typeof x !== 'undefined';
}

function is_object(x) {
    return Object.prototype.toString.call(x) === "[object Object]";
}

function is_array(x) {
    return Object.prototype.toString.call(x) === "[object Array]";
}

var RiskAdapter = {};

RiskAdapter.predictRiskLevelByJSON = function(data, successCB, errorCB) {
    if (is_defined(data) && !is_array(data)) {
        var body = data;
        this.ajaxCall("predictRiskLevelByJSON", body, successCB, errorCB);
    } else {
        // Error handling
        errorCB("Error: " + "Invalid Parameters");
    }
};

RiskAdapter.predictTasksByJSON = function(data, successCB, errorCB) {
    if (is_defined(data) && !is_array(data)) {
        var body = data;
        this.ajaxCall("predictTasksByJSON", body, successCB, errorCB);
    } else {
        // Error handling
        errorCB("Error: " + "Invalid Parameters");
    }
};



RiskAdapter.ajaxCall = function(operation, body, successCB, errorCB) {
    $.ajax({
        "url": RiskAdapter_config.risk_server_url + operation,
        "method": "POST",
        "contentType": "application/json; charset=utf-8",
        "data": JSON.stringify(body),
        "success": function(result){
            successCB(result);
        },
        "error":  function(xhr, ajaxOptions, thrownError) {
            errorCB("Error: " + thrownError);
        }
    });
}