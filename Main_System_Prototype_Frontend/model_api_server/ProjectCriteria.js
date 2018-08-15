
var ProjectCriteria = {};

ProjectCriteria.name = "ProjectCriteria";              // Model name

ProjectCriteria.attributes = [            // Model attribute list
    "productType",
    "releaseCycle",
    "swComplexity",
    "hwDependency",
    "availableSkills",
    "qualityAvailability",
    "supportability"
];

// Model functions

ProjectCriteria.createProjectCriteria = function(data, success, error) {
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

    ApiAdapter.createOne(ProjectCriteria.name, data, successCB, errorCB);
};

ProjectCriteria.readProjectCriteria = function(data, success, error) {
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

    ApiAdapter.readOne(ProjectCriteria.name, data, successCB, errorCB);
};

ProjectCriteria.updateProjectCriteria = function(search, update, success, error) {
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

    ApiAdapter.update(ProjectCriteria.name, data, successCB, errorCB);
};

ProjectCriteria.deleteProjectCriteria = function(data, success, error) {
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

    ApiAdapter.delete(ProjectCriteria.name, data, successCB, errorCB);
};

ProjectCriteria.get = function(id, success, error) {
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

    ApiAdapter.readOne(ProjectCriteria.name, data, successCB, errorCB);
};

ProjectCriteria.set = function(id, newData, success, error) {
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

    ApiAdapter.update(ProjectCriteria.name, data, successCB, errorCB);
};

// Add the other functions here


