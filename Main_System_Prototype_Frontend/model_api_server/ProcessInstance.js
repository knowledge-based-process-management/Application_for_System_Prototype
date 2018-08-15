
var ProcessInstance = {};

ProcessInstance.name = "ProcessInstance";              // Model name

ProcessInstance.attributes = [            // Model attribute list
    // "useHuaweiTerminology",
    // "appliedProcessStrategy"
];

// Model functions

ProcessInstance.setInstanceAcceptability = function(data, success, error) {
    // Wrap data
    var self = this;

    var body = {
        instanceId : data.instanceId,
        variables : [
            {
                "name": "exec_default",
                "type": "string",
                "value": data.approved ? "acceptable" : "addressable"
            }
        ]
    }
    // Define callback function
    function successCB(msg) {
        // Success handling
        success(msg);
    };

    function errorCB(msg) {
        // Error handling
        error(msg);
    };

    DBAdapter.setInstanceVariables({}, body, successCB.bind(self), errorCB);
}

// Bo: Hard code for TR4
ProcessInstance.setTR4InstancePath = function(data, success, error) {
    // Wrap data
    var self = this;

    var body = {
        instanceId : data.instanceId,
        variables : [
            {
                "name": "TR4_exec_path",
                "type": "string",
                "value": data.risk
            }
        ]
    }
    // Define callback function
    function successCB(msg) {
        // Success handling
        success(msg);
    };

    function errorCB(msg) {
        // Error handling
        error(msg);
    };

    DBAdapter.setInstanceVariables({}, body, successCB.bind(self), errorCB);
}

ProcessInstance.createProcessInstance = function(data, success, error) {
    // Wrap data

    // Define callback function
    function successCB(msg) {
        // Success handling
        success(msg);
    }

    function errorCB(msg) {
        // Error handling
        error(msg);
    }

    DBAdapter.createOne(ProcessInstance.name, data, successCB, errorCB);
};

ProcessInstance.readProcessInstance = function(data, success, error) {
    // Wrap data

    // Define callback function
    function successCB(msg) {
        // Success handling
        success(msg);
    }

    function errorCB(msg) {
        // Error handling
        error(msg);
    }

    DBAdapter.readOne(ProcessInstance.name, data, successCB, errorCB);
};

ProcessInstance.updateProcessInstance = function(search, update, success, error) {
    // Wrap data
    var data = {
        oldData : search,
        newData : update
    };

    // Define callback function
    function successCB(msg) {
        // Success handling
        success(msg);
    }

    function errorCB(msg) {
        // Error handling
        error(msg);
    }

    DBAdapter.update(ProcessInstance.name, data, successCB, errorCB);
};

ProcessInstance.deleteProcessInstance = function(data, success, error) {
    // Wrap data

    // Define callback function
    function successCB(msg) {
        // Success handling
        success(msg);
    }

    function errorCB(msg) {
        // Error handling
        error(msg);
    }

    DBAdapter.delete(ProcessInstance.name, data, successCB, errorCB);
};

ProcessInstance.get = function(id, success, error) {
    // Wrap data
    var data = {"_id" : id};

    // Define callback function
    function successCB(msg) {
        // Success handling
        success(msg);
    }

    function errorCB(msg) {
        // Error handling
        error(msg);
    }

    DBAdapter.readOne(ProcessInstance.name, data, successCB, errorCB);
};

ProcessInstance.set = function(id, newData, success, error) {
    // Wrap data
    var data = {"_id" : id, "newData" : newData};

    // Define callback function
    function successCB(msg) {
        // Success handling
        success(msg);
    }

    function errorCB(msg) {
        // Error handling
        error(msg);
    }

    DBAdapter.update(ProcessInstance.name, data, successCB, errorCB);
};

// Add the other functions here


