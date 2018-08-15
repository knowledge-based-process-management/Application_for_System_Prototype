
function is_defined(x) {
    return typeof x !== 'undefined';
}

function is_object(x) {
    return Object.prototype.toString.call(x) === "[object Object]";
}

function is_array(x) {
    return Object.prototype.toString.call(x) === "[object Array]";
}

function is_string(x) {
    return typeof x === "string";
}

var DBAdapter = {};

// collection : string, name of the the deployed process. e.g. collection = "icsm_2nd_level:1:4342";
// data : object, should be empty object. e.g. data = {}
DBAdapter.getProcess = function(collection, data, successCB, errorCB) {
    var operation = "activiti-rest/service/repository/process-definitions/" + collection + "/model";
    if (is_defined(collection) && is_defined(data)) {
        var body = {};
        ajaxCall(operation, "GET", body, successCB, errorCB);
    } else {
        // Error handling
        errorCB("[Error] " + "Invalid Parameters");
    }
};

// collection : object, should be empty object. e.g. collection = {}
// data : string, id of the specified running instance
DBAdapter.getInstance = function(collection, data, successCB, errorCB) {
    var operation = "activiti-rest/service/runtime/process-instances/" + data;
     if (is_defined(collection) && is_defined(data)) {
        var body = {};
        ajaxCall(operation, "GET", body, successCB, errorCB);
    } else {
        // Error handling
        errorCB("[Error] " + "Invalid Parameters");
    }
};

// collection : string, name of the the deployed process. e.g. collection = "icsm_2nd_level:1:4342";
// data : string, the variables used to create the instance
// TODO: The variables can be specified while creating instance
DBAdapter.createInstance = function(collection, data, successCB, errorCB) {
    var operation = "activiti-rest/service/runtime/process-instances";
    if (is_defined(collection) && is_defined(data)) {
        var body = {
            "processDefinitionId" : collection,
            "variables" : data
        }
        ajaxCall(operation, "POST", body, successCB, errorCB);
    } else {
        // Error handling
        errorCB("[Error] " + "Invalid Parameters");
    }
};

// collection : object, should be empty object. e.g. collection = {}
// data : string, id of the specified running instance
DBAdapter.getInstanceDiagram = function(collection, data, successCB, errorCB) {
    var operation = "activiti-rest/service/runtime/process-instances/" + data + "/diagram";
    // if (is_defined(collection) && is_defined(data)) {
    //     var body = {};
    //     ajaxCall(operation, "GET", body, successCB, errorCB);
    // } else {
    //     // Error handling
    //     errorCB("[Error] " + "Invalid Parameters");
    // }
    // return operation;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            //this.response is what you're looking for
            var url = window.URL || window.webkitURL;
            successCB(url.createObjectURL(this.response));
        }
    }
    xhr.open('GET', encodeURI(ApiAdapter_config.method + Activiti_config.server + operation));
    xhr.responseType = 'blob';
    xhr.setRequestHeader("Authorization", make_base_auth(Activiti_config.user, Activiti_config.pass));
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(); 
};

// collection : string, name of the the deployed process. e.g. collection = "icsm_2nd_level:1:4342";
// data : string, the processInstancedId that will return after createInstance
DBAdapter.getActiveTasks = function(collection, data, successCB, errorCB) {
    var operation = "activiti-rest/service/query/tasks";
    if (is_defined(collection) && is_defined(data)) {
        var body = {
            processInstanceId : data,
            size : 100,
            start : 0
        };
        
        ajaxCall(operation, "POST", body, successCB, errorCB);
    } else {
        // Error handling
        errorCB("[Error] " + "Invalid Parameters");
    }
};

// collection : string, name of the the deployed process. e.g. collection = "icsm_2nd_level:1:4342";
// data : string, the id of the task
// TODO: The variables can be specified while complete the task
DBAdapter.getCompletedTasks = function(collection, data, successCB, errorCB) {
    var operation = "activiti-rest/service/query/historic-task-instances";
    if (is_defined(collection) && is_defined(data)) {
        var body = {
            processInstanceId : data,
            taskDeleteReason : "completed",
            size : 100,
            start : 0
        };
        
        ajaxCall(operation, "POST", body, successCB, errorCB);
    } else {
        // Error handling
        errorCB("[Error] " + "Invalid Parameters");
    }
};

// collection : string, name of the the deployed process. e.g. collection = "icsm_2nd_level:1:4342";
// data : string, the id of the task
// TODO: The variables can be specified while complete the task
DBAdapter.completeTask = function(collection, data, successCB, errorCB) {
    var operation = "activiti-rest/service/runtime/tasks/" + data;
    if (is_defined(collection) && is_defined(data)) {
        var body = {
            action : "complete",
            variables : []
        };
        
        ajaxCall(operation, "POST", body, successCB, errorCB);
    } else {
        // Error handling
        errorCB("[Error] " + "Invalid Parameters");
    }
};

// For Demo purpose

// collection : object, should be empty object. e.g. collection = {}
// data.instanceId : string, id of the specified running instance
// data.variables : array, variables list
DBAdapter.setInstanceVariables = function(collection, data, successCB, errorCB) {
    var operation = "activiti-rest/service/runtime/process-instances/" + data.instanceId + "/variables";
    if (is_defined(collection) && is_defined(data)) {
        var body = {

        };

        ajaxCall(operation, "PUT", data.variables, successCB, errorCB);
    } else {
        // Error handling
        errorCB("[Error] " + "Invalid Parameters");
    }
};

// collection : object, should be empty object. e.g. collection = {}
// data : string, id of the specified running instance
DBAdapter.getInstanceVariables = function(collection, data, successCB, errorCB) {
    var operation = "activiti-rest/service/runtime/process-instances/" + data + "/variables";
    if (is_defined(collection) && is_defined(data)) {
        var body = {
        };

        ajaxCall(operation, "GET", body, successCB, errorCB);
    } else {
        // Error handling
        errorCB("[Error] " + "Invalid Parameters");
    }
};
// TODO: 
// 1. Control the variables that within a process instance
// 2. Any other new requirements


// Utilities

function ajaxCall(operation, method, body, successCB, errorCB) {

    $.ajax({
        "url": encodeURI(Activiti_config.method + Activiti_config.server + operation),
        "method": method,
        "data": JSON.stringify(body),
        "beforeSend" : function (xhr) {
            xhr.setRequestHeader("Authorization", make_base_auth(Activiti_config.user, Activiti_config.pass));
            xhr.setRequestHeader("Content-Type", "application/json");
        },
        "success": function(result, status, settings){
            successCB(result);

        },
        "error":  function(xhr, ajaxOptions, thrownError) {
            errorCB("[Error] " + xhr.responseText);
        }
    });
}

function make_base_auth(user, password) {
    var tok = user + ':' + password;
    var hash = btoa(tok);
    return "Basic " + hash;
}





