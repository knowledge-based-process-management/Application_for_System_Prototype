
var Rule = {
    container : "evidenceRule"
};

// Model functions

Rule.queryRule = function(data, success, error) {
    // Wrap data

    // Define callback function
    function successCB(msg) {
        // Success handling
        if (msg.type == "SUCCESS") {
            success(msg.result["execution-results"].results[0].value["demo.Evidence"]);
        } else {
            errorCB(msg);
        }
        
    }

    function errorCB(msg) {
        // Error handling
        error(msg);
    }

    RuleAdapter.queryRule(Rule.container, data, successCB, errorCB);
};



// Add the other functions here
