
var CostEstimation = {};

CostEstimation.name = "CostEstimation";              // Model name

CostEstimation.attributes = [            // Model attribute list
    "estimatedCost",
    "actualCost",
    "..."
];

// Model functions

CostEstimation.createCostEstimation = function(data, success, error) {
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

    DBAdapter.createOne(CostEstimation.name, data, successCB, errorCB);
};

CostEstimation.readCostEstimation = function(data, success, error) {
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

    DBAdapter.readOne(CostEstimation.name, data, successCB, errorCB);
};

CostEstimation.updateCostEstimation = function(search, update, success, error) {
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

    DBAdapter.update(CostEstimation.name, data, successCB, errorCB);
};

CostEstimation.deleteCostEstimation = function(data, success, error) {
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

    DBAdapter.delete(CostEstimation.name, data, successCB, errorCB);
};

CostEstimation.get = function(id, success, error) {
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

    DBAdapter.readOne(CostEstimation.name, data, successCB, errorCB);
};

CostEstimation.set = function(id, newData, success, error) {
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

    DBAdapter.update(CostEstimation.name, data, successCB, errorCB);
};

// Add the other functions here


