var config = {
    method : "http://",
    server : "ec2-54-67-99-52.us-west-1.compute.amazonaws.com:8686/", //"http://localhost:8080/",
    user : "kermit",
    pass : "kermit"
};

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
         console.log(body);
        ajaxCall(operation, "POST", body, successCB, errorCB);
    } else {
        // Error handling
        errorCB("[Error] " + "Invalid Parameters");
    }
};

// collection : object, should be empty object. e.g. collection = {}
// data : string, id of the specified running instance
DBAdapter.getInstanceDiagram = function(collection, data, successCB, errorCB) {
    var operation = encodeURI(config.method + config.user + ":" + config.pass + "@" + config.server + "activiti-rest/service/runtime/process-instances/" + data + "/diagram");
    // if (is_defined(collection) && is_defined(data)) {
    //     var body = {};
    //     ajaxCall(operation, "GET", body, successCB, errorCB);
    // } else {
    //     // Error handling
    //     errorCB("[Error] " + "Invalid Parameters");
    // }
    return operation;
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
        "url": encodeURI(config.method + config.server + operation),
        "method": method,
        "data": JSON.stringify(body),
        "beforeSend" : function (xhr) {
            xhr.setRequestHeader("Authorization", make_base_auth(config.user, config.pass));
            xhr.setRequestHeader("Content-Type", "application/json");
        },
        "success": function(result){
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





