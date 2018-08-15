
var RiskPrediction = {};

RiskPrediction.name = "RiskPrediction";              // Model name

RiskPrediction.attributes = [            // Model attribute list
    // "title",
    // "description",
    // "value"
];

// Model functions

RiskPrediction.createRiskPrediction = function(data, success, error) {
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

    ApiAdapter.createOne(RiskPrediction.name, data, successCB, errorCB);
};

RiskPrediction.readRiskPrediction = function(data, success, error) {
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

    ApiAdapter.readOne(RiskPrediction.name, data, successCB, errorCB);
};

RiskPrediction.updateRiskPrediction = function(search, update, success, error) {
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

    ApiAdapter.update(RiskPrediction.name, data, successCB, errorCB);
};

RiskPrediction.deleteRiskPrediction = function(data, success, error) {
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

    ApiAdapter.delete(RiskPrediction.name, data, successCB, errorCB);
};

RiskPrediction.get = function(id, success, error) {
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

    ApiAdapter.readOne(RiskPrediction.name, data, successCB, errorCB);
};

RiskPrediction.set = function(id, newData, success, error) {
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

    ApiAdapter.update(RiskPrediction.name, data, successCB, errorCB);
};

// Add the other functions here


// The data below is created as default values for demo purpose if some factors are currently available. 
var Huawei_risk_factor_sample = {
   "RELY": 1,
   "DATA": 1.14,
   "CPLX": 1,
   "RUSE": 0.95,
   "DOCU": 1,
   "TIME": 1,
   "STOR": 1,
   "PVOL": 0.87,
   "ACAP": 0.85,
   "PCAP": 0.88,
   "PCON": 0.81,
   "APEX": 1,
   "PLEX": 1,
   "LTEX": 1,
   "TOOL": 1,
   "SITE": 1,
   "SCED": 1,
   "AA": 0.1,
   "PR": 0.4,
   "TSL": 0.4,
   "FCR": -782.0727772,
   "CD": 821.7832461,
   "ISS": 356.9644555,
   "ISRR": 1535.990724,
   "DRR": 1266.675239,
   // Factors from opensource project, values are currently set as averages from the emperical study
   "Phase": 2,
   "ISS_Num_Resolved": 281,
   "ISS_Num_Unresolved": 568,
   "Personnel": 8,
   "Estimated Effort": 768,
   "Accu_Trivial": 0, 
   "Accu_Minor": 2,
   "Accu_Major": 8,
   "Accu_Critical": 0,
   "Accu_Block": 0,
   "Csmell": 1023.625,
   "Svul": 23.375
 };