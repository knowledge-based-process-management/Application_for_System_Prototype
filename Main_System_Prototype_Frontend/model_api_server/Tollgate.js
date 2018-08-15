
var Tollgate = {
    transition_readiness_review : "sp_trr:1:4154"
};

Tollgate.name = "Tollgate";              // Model name

Tollgate.attributes = [            // Model attribute list
    "bpmnElementID",
    "requiredCriteria",
    "requiredEvidence",
    "requiredRiskAssessment",
    "requiredCostEstimation",
    "ruleID"
];

// Model functions

Tollgate.createTollgate = function(data, success, error) {
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

    DBAdapter.createOne(Tollgate.name, data, successCB, errorCB);
};

Tollgate.readTollgate = function(data, success, error) {
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

    DBAdapter.readOne(Tollgate.name, data, successCB, errorCB);
};

Tollgate.updateTollgate = function(search, update, success, error) {
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

    DBAdapter.update(Tollgate.name, data, successCB, errorCB);
};

Tollgate.deleteTollgate = function(data, success, error) {
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

    DBAdapter.delete(Tollgate.name, data, successCB, errorCB);
};

Tollgate.get = function(id, success, error) {
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

    DBAdapter.readOne(Tollgate.name, data, successCB, errorCB);
};

Tollgate.set = function(id, newData, success, error) {
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

    DBAdapter.update(Tollgate.name, data, successCB, errorCB);
};

// Add the other functions here


