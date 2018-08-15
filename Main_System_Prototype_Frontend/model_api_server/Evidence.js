
var Evidence = {};

Evidence.name = "Evidence";              // Model name

Evidence.attributes = [            // Model attribute list
    // "title",
    // "description",
    // "date",
    // "type",
    // "url",
    // "integrity",
    // roleId : "",
    // instanceId : "",
    // actionId : ""
];

// Model functions

Evidence.createEvidence = function(data, success, error) {
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

    ApiAdapter.createOne(Evidence.name, data, successCB, errorCB);
};

Evidence.uploadEvidence = function(data, success, error) {
    // Wrap data
    var metadata = {
        title : data.title,
        description : "",
        date : "",
        type : "",
        url : "",
        integrity : data.integrity,
        roleId : "",
        instanceId : data.instanceId,
        actionId : ""
    };

    var form = new FormData();
    form.append("metadata", JSON.stringify(metadata));
    form.append("filefield", data.file);

    // Define callback function
    function successCB(msg) {
        // Success handling
        success(msg);
    }

    function errorCB(msg) {
        // Error handling
        error(msg);
    }

    ApiAdapter.uploadFile(form, successCB, errorCB);
};

Evidence.readEvidence = function(data, success, error) {
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

    ApiAdapter.readOne(Evidence.name, data, successCB, errorCB);
};

Evidence.updateEvidence = function(search, update, success, error) {
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

    ApiAdapter.update(Evidence.name, data, successCB, errorCB);
};

Evidence.deleteEvidence = function(data, success, error) {
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

    ApiAdapter.delete(Evidence.name, data, successCB, errorCB);
};

Evidence.get = function(id, success, error) {
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

    ApiAdapter.readOne(Evidence.name, data, successCB, errorCB);
};

Evidence.set = function(id, newData, success, error) {
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

    ApiAdapter.update(Evidence.name, data, successCB, errorCB);
};

// Add the other functions here

// The data below is created for demo purpose. 
var Huawei_criteria = {
    "Feasibility" : {
        "phase" : "Feasibility",
        "milestone" : "TR1",
        "documents" : [
            {
                "name" : "Release Content List",
                "required" : "85",
                "actual" : "N/A"
            },
            {
                "name" : "Requirements Documents",
                "required" : "85",
                "actual" : "N/A"
            },
            {
                "name" : "High Level Development Estimates",
                "required" : "85",
                "actual" : "N/A"
            },
            {
                "name" : "Commitment on Resource Availability",
                "required" : "85",
                "actual" : "N/A"
            },
            {
                "name" : "Feature Project Plan",
                "required" : "85",
                "actual" : "N/A"
            },
            {
                "name" : "System Architecture Doc.",
                "required" : "85",
                "actual" : "N/A"
            }
        ]
    },
    "PlanAndDesign" : {
        "phase" : "Planning & Design",
        "milestone" : "TR2",
        "documents" : [
            {
                "name" : "Commitment on Resource Availability",
                "required" : "100",
                "actual" : "N/A"
            },
            {
                "name" : "Detailed Level Development Estimates",
                "required" : "85",
                "actual" : "N/A"
            },
            {
                "name" : "Feature Project Plan",
                "required" : "100",
                "actual" : "N/A"
            },
            {
                "name" : "System Architecture Doc.",
                "required" : "85",
                "actual" : "N/A"
            },
            {
                "name" : "Schedule for Release",
                "required" : "100",
                "actual" : "N/A"
            },
            {
                "name" : "Project Stories-Customer Requirements Mapping",
                "required" : "80",
                "actual" : "N/A"
            },
            {
                "name" : "High Level Product Test Estimates",
                "required" : "85",
                "actual" : "N/A"
            }
        ]
    },
    "Development" : {
        "phase" : "Development",
        "milestone" : "TR3",
        "documents" : [
            {
                "name" : "Project Stories-Customer Requirements Mapping",
                "required" : "95",
                "actual" : "N/A"
            },
            {
                "name" : "Verification Backlog",
                "required" : "85",
                "actual" : "N/A"
            },
            {
                "name" : "Product Test Estimates",
                "required" : "85",
                "actual" : "N/A"
            },
            {
                "name" : "Identified Nodal Interactions",
                "required" : "85",
                "actual" : "N/A"
            }
        ]
    },
    "Verification" : {
        "phase" : "Verification",
        "milestone" : "TR4",
        "documents" : [
            {
                "name" : "Executed Nodal Testcases",
                "required" : "99",
                "actual" : "N/A"
            },
            {
                "name" : "Nodal Testcases Pass Rate",
                "required" : "95",
                "actual" : "N/A"
            },
            {
                "name" : "Feature Documentation",
                "required" : "95",
                "actual" : "N/A"
            },
            {
                "name" : "Requirements-Testcases Mapping",
                "required" : "90",
                "actual" : "N/A"
            },
            {
                "name" : "Carry-over Trouble Ticket Resolution",
                "required" : "100",
                "actual" : "N/A"
            },
            {
                "name" : "Preliminary Capacity and Memory Analysis",
                "required" : "100",
                "actual" : "N/A"
            },
            {
                "name" : "Completed Regression",
                "required" : "100",
                "actual" : "N/A"
            },
            {
                "name" : "Regression Pass Rate",
                "required" : "95",
                "actual" : "N/A"
            },
            {
                "name" : "Validated Upgrade Paths",
                "required" : "100",
                "actual" : "N/A"
            },
            {
                "name" : "Meantime to Repair",
                "required" : "1.5",
                "actual" : "N/A"
            }
        ]
    },
    "DeploymentValidation" : {
        "phase" : "Deployment Validation",
        "milestone" : "TR5",
        "documents" : [
            {
                "name" : "Code Repository",
                "required" : "100",
                "actual" : "N/A"
            },
            {
                "name" : "Executed Product Test Cases",
                "required" : "100",
                "actual" : "N/A"
            },
            {
                "name" : "Test Case Pass Rate",
                "required" : "99.5",
                "actual" : "N/A"
            },
            {
                "name" : "Trade Compliance & Configuration Management Checklists",
                "required" : "85",
                "actual" : "N/A"
            },
            {
                "name" : "Problem Tickets in Development",
                "required" : "100", // This item is special
                "actual" : "N/A"
            },
            {
                "name" : "Problem Tickets in Verification",
                "required" : "100", // This item is special
                "actual" : "N/A"
            },
            {
                "name" : "Operations, Administration & Maintenance (OA&M)",
                "required" : "95",
                "actual" : "N/A"
            },
            {
                "name" : "Customer Documentation",
                "required" : "100",
                "actual" : "N/A"
            },
            {
                "name" : "Documentation Problem Tickets Resolution",
                "required" : "95",
                "actual" : "N/A"
            },
            {
                "name" : "Final Capacity & Memory Analysis",
                "required" : "100",
                "actual" : "N/A"
            },
            {
                "name" : "Support Resources",
                "required" : "95",
                "actual" : "N/A"
            }
        ]
    }
};