
var RiskAssessment = {};

RiskAssessment.name = "RiskAssessment";              // Model name

RiskAssessment.attributes = [            // Model attribute list
    "title",
    "description",
    "value"
];

// Model functions

RiskAssessment.createRiskAssessment = function(data, success, error) {
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

    DBAdapter.createOne(RiskAssessment.name, data, successCB, errorCB);
};

RiskAssessment.readRiskAssessment = function(data, success, error) {
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

    DBAdapter.readOne(RiskAssessment.name, data, successCB, errorCB);
};

RiskAssessment.updateRiskAssessment = function(search, update, success, error) {
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

    DBAdapter.update(RiskAssessment.name, data, successCB, errorCB);
};

RiskAssessment.deleteRiskAssessment = function(data, success, error) {
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

    DBAdapter.delete(RiskAssessment.name, data, successCB, errorCB);
};

RiskAssessment.get = function(id, success, error) {
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

    DBAdapter.readOne(RiskAssessment.name, data, successCB, errorCB);
};

RiskAssessment.set = function(id, newData, success, error) {
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

    DBAdapter.update(RiskAssessment.name, data, successCB, errorCB);
};

// Add the other functions here


