
var Workflow = {
    "start_point" : "sp_sp:1:4130",
    "transition_iteration" : "sp_ti:1:4150",
    "foundations_design" : "sp_fd:1:4142",
    "foundations_schedule" : "sp_fs:1:4146",
    "construction_increment" : "sp_ci:1:4134",
    "expert_code_review" : "sp_ecr:1:4138"
};

Workflow.name = "Workflow";              // Model name

Workflow.attributes = [            // Model attribute list
    "startDate",
    "stopDate",
    "phases",
    "tasks",
    "steps"
];

// Model functions

Workflow.createWorkflow = function(data, success, error) {
    // Wrap data
    let body = {
        "active_instances" : [data],
        "createAt" : new Date()
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

    ApiAdapter.createOne(Workflow.name, body, successCB, errorCB);
};

Workflow.readWorkflow = function(data, success, error) {
    // Wrap data
    let body = {
        "_id" : data
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

    ApiAdapter.readOne(Workflow.name, body, successCB, errorCB);
};

Workflow.updateWorkflow = function(search, update, success, error) {
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

    ApiAdapter.update(Workflow.name, data, successCB, errorCB);
};

Workflow.deleteWorkflow = function(data, success, error) {
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

    ApiAdapter.delete(Workflow.name, data, successCB, errorCB);
};

Workflow.get = function(id, success, error) {
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

    ApiAdapter.readOne(Workflow.name, data, successCB, errorCB);
};

Workflow.set = function(id, newData, success, error) {
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

    ApiAdapter.update(Workflow.name, data, successCB, errorCB);
};

// Add the other functions here


