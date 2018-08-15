
var Process = function() {
    this.processDefinitionId = null;
    this.info = null;
    this.instance = null;
    this.activeTask = null;
    this.completedTask = null;
    this.user = null;
    this.tasks = null;
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

Process.prototype.getInstanceDiagramSrc = function(data, success, error) {
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

    return DBAdapter.getInstanceDiagram({}, data, successCB.bind(self), errorCB);
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


