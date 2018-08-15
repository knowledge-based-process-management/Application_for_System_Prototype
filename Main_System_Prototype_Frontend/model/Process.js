process_definition_id = {
    "sp_sp" : "sp_sp:1:4130",
    "sp_ti" : "sp_ti:1:4150",
    "sp_trr" : "sp_trr:1:4212",
    "sp_ci" : "sp_ci:1:4134",
    "sp_ecr" : "sp_ecr:1:4138",
    "sp_fd" : "sp_fd:1:4142",
    "sp_fs" : "sp_fs:1:4146"
};

var Process = function() {
    this.processDefinitionId = null;
    this.info = null;
    this.instance = null;
    this.activeTask = null;
    this.completedTask = null;
    this.user = null;
    this.task = null;
};

// Model functions

Process.prototype.createProcessInstance = function(data, success, error) {
    // Wrap data
    var self = this;
    // Define callback function
    function successCB(msg) {
        // Success handling
        self.instance = msg.id;
        success(msg);
    };

    function errorCB(msg) {
        // Error handling
        error(msg);
    };

    DBAdapter.createInstance(this.processDefinitionId, data, successCB.bind(self), errorCB);
};

Process.prototype.readProcessInfo = function(data, success, error) {
    // Wrap data
    var self = this;
    // Define callback function
    function successCB(msg) {
        // Success handling
        self.info = msg;
        success(msg);
    };

    function errorCB(msg) {
        // Error handling
        error(msg);
    };

    DBAdapter.getProcess(this.processDefinitionId, {}, successCB.bind(self), errorCB);
}

Process.prototype.getProcessDefinitionId = function(data, success, error) {
    // Wrap data
    var self = this;
    // Define callback function
    function successCB(msg) {
        // Success handling
        self.processDefinitionId = msg.processDefinitionId;
        success(msg);
    };

    function errorCB(msg) {
        // Error handling
        error(msg);
    };

    DBAdapter.getInstance({}, data, successCB.bind(self), errorCB);
}

Process.getInstanceDiagramSrc = function(data, success, error) {
    // Wrap data
    var self = this;
    // Define callback function
    function successCB(msg) {
        // Success handling
        success(msg);
    };

    function errorCB(msg) {
        // Error handling
        error(msg);
    };

    DBAdapter.getInstanceDiagram({}, data, successCB.bind(self), errorCB);
}

Process.prototype.getInstanceVariables = function(data, success, error) {
    // Wrap data
    var self = this;
    // Define callback function
    function successCB(msg) {
        // Success handling
        success(msg);
    };

    function errorCB(msg) {
        // Error handling
        error(msg);
    };

    DBAdapter.getInstanceVariables({}, data, successCB.bind(self), errorCB);
}

// UNDEFINED BELOW

Process.prototype.updateProcess = function(search, update, success, error) {
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

Process.prototype.deleteProcess = function(data, success, error) {
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


