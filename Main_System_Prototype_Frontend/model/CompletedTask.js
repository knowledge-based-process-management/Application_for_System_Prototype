
var CompletedTask = function(processDefinitionId, processInstanceId){
    this.processDefinitionId = processDefinitionId;
    this.processInstanceId = processInstanceId;
    this.list = {};
};

// Model functions

CompletedTask.prototype.readCompletedTask = function(data, success, error) {
    // Wrap data
    var self = this;
    // Define callback function
    function successCB(msg) {
        // Success handling
        for (var i = 0; i < msg.data.length; i++) {
            if (msg.data[i].deleteReason == "completed")
                self.list[msg.data[i].taskDefinitionKey] = msg.data[i].id;
        }
        success(self.list);
    }

    function errorCB(msg) {
        // Error handling
        error(msg);
    }

    DBAdapter.getCompletedTasks(this.processDefinitionId, this.processInstanceId, successCB.bind(self), errorCB);
};

// UNDEFINED BELOW

CompletedTask.prototype.createCompletedTask = function(data, success, error) {
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

CompletedTask.prototype.updateCompletedTask = function(search, update, success, error) {
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

CompletedTask.prototype.deleteCompletedTask = function(data, success, error) {
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


