var bpmn_element = {
    start_event : "se_",
    subprocess : "sp_",
    flow : "f_",
    user_task : "ut_",
    end_event : "ee_"
};

// This is more proper to be specified in DROOLS engine.
var next_start_activity = {
    // for TR4
    "sp_sp" : ["sp_trr"],
    "sp_ti" : [],
    "sp_trr" : [],
    "sp_ci" : ["sp_sp"],
    "sp_ecr" : ["sp_ci"],
    "sp_fd" : ["sp_ci"],
    "sp_fs" : ["sp_trr"]
};

var task_end_event = {
    "sp_sp" : ["ut_sp_dpp", "ut_sp_rtr", "ut_sp_pccd"],
    "sp_ti" : ["ut_ti_pt", "ut_ti_ps", "ut_ti_ptt"],
    "sp_trr" : ["ut_trr_trr"],
    "sp_ci" : ["ut_rca"],
    "sp_ecr" : ["ut_ecr_ecr"],
    "sp_fd" : ["ut_fd_gdd"],
    "sp_fs" : ["ut_fs_aps"]
};

// The object below is for demo purpose
var tollgate_list = {
    // for AA
    // "ut_vcr" : "Valuation Commitment Review",
    // "ut_fcr" : "Foundations Commitment Review",
    // "ut_dcr" : "Development Commitment Review",

    // for TR4
    // "ut_rca" : "Run Code Analysis",
    "ut_trr_trr" : "Transition Readiniess Review"
};

// 

var Node = function(id, activity) {
    this.id = id;
    this.activity = activity;
    this.next = [];
}

var Task = function(processDefinition){
    this.processDefinition = processDefinition;
};

// Model functions

Task.prototype.readTask = function(data, success, error) {
    // Wrap data
    var self = this;
    if (!is_defined(this.processDefinition))
        return;
    var taskSet = {};

    function retrieveNode(id, activity) {
        var node = null;
        if (!is_defined(taskSet[id])) {
            node = new Node(id, activity);
            taskSet[id] = node;
        } else {
            node = taskSet[id];
        }
        return node;
    }

    let process = this.processDefinition.processes;
    let activityId = this.processDefinition.mainProcess.id;
    for (var i = 0; i < process.length; i++) {
        if (!is_defined(process[i].flowElements)) continue;

        element = process[i].flowElements;
        for (var x = 0; x < element.length; x++) {
            var node = retrieveNode(element[x].id, activityId);

            var outgoingFlow = null;
            if(is_defined(element[x].outgoingFlows)) {
                outgoingFlow = element[x].outgoingFlows;
            } else if (is_defined(element[x].targetRef)) {
                outgoingFlow = element[x].targetRef;
            }

            if (outgoingFlow == null) continue;
            else if (is_array(outgoingFlow)) {
                for (var y = 0; y < outgoingFlow.length; y++) {
                    var child = retrieveNode(outgoingFlow[y].id, activityId);
                    node.next.push(child);
                }
            } else if (is_string(outgoingFlow)) {
                var child = retrieveNode(outgoingFlow, activityId);
                node.next.push(child);
            }   
        }
        
    }

    // Define callback function
    function successCB(msg) {
        // Success handling
        success(msg);
    }

    function errorCB(msg) {
        // Error handling
        error(msg);
    }
    
    return taskSet;
};

Task.prototype.readNextTask = function(data, success, error) {
    // Wrap data
    var self = this;

    var tasks = this.readTask();
    var taskSet = {};

    function getNextUserTask(node) {
        if (node.id.includes(bpmn_element.user_task)) {
            return [node.id];
        } else if (node.id.includes(bpmn_element.end_event)) {
            return [next_start_activity[node.phase]];
        }

        var result = [];
        for (var i = 0; i < node.next.length; i++) {
            result = result.concat(getNextUserTask(node.next[i]));
        } 
        return result;
    } 
    var element = Object.keys(tasks);
    for (var i = 0; i < element.length; i++) {
        if(element[i].includes(bpmn_element.user_task)) {
            if (!is_defined(taskSet[element[i]])) {
                taskSet[element[i]] = [];
            }
            for (var j = 0; j < tasks[element[i]].next.length; j++) {
                taskSet[element[i]] = taskSet[element[i]].concat(getNextUserTask(tasks[element[i]].next[j]));
            }
        }
    }

    
    // Define callback function
    function successCB(msg) {
        // Success handling
        success(msg);
    }

    function errorCB(msg) {
        // Error handling
        error(msg);
    }
    
    return taskSet;
};

Task.prototype.completeTask = function(data, success, error) {
    // Wrap data
    var self = this;
    
    // Define callback function
    function successCB(msg) {
        // Success handling
        success(msg);
    }

    function errorCB(msg) {
        // Error handling
        error(msg);
    }
    DBAdapter.completeTask(this.processDefinition, data, successCB, errorCB);
};

// UNDEFINED BELOW

Task.prototype.createTask = function(data, success, error) {
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

};

Task.prototype.updateTask = function(search, update, success, error) {
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

};

Task.prototype.deleteTask = function(data, success, error) {
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

};

// Add the other functions here


