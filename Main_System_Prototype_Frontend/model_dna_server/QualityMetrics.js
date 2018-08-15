
var QualityMetrics = {};

QualityMetrics.name = "QualityMetrics";              // Model name

QualityMetrics.attributes = [            // Model attribute list

];

// Model functions

QualityMetrics.readQualityMetrics = function(data, success, error) {
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

    DnaAdapter.progressMetricsForRiskPrediction(data, successCB, errorCB);
};



// Add the other functions here


