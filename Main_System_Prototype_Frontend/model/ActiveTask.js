
var ActiveTask = function(processDefinitionId, processInstanceId){
    this.processDefinitionId = processDefinitionId;
    this.processInstanceId = processInstanceId;
    this.list = {};
};

// Model functions

ActiveTask.prototype.readActiveTask = function(data, success, error) {
    // Wrap data
    var self = this;
    // Define callback function
    function successCB(msg) {
        // Success handling
        var list = msg.data;
        for (var i = 0; i < list.length; i++) {
            self.list[list[i].taskDefinitionKey] = self.processInstanceId + "_" + list[i].id;
        }
        
        success(self.list);
    }

    function errorCB(msg) {
        // Error handling
        error(msg);
    }

    DBAdapter.getActiveTasks(this.processDefinitionId, this.processInstanceId, successCB.bind(self), errorCB);
};

// UNDEFINED BELOW

ActiveTask.prototype.createActiveTask = function(data, success, error) {
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

ActiveTask.prototype.updateActiveTask = function(search, update, success, error) {
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

ActiveTask.prototype.deleteActiveTask = function(data, success, error) {
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


