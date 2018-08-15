var User = function(processDefinition){
    this.processDefinition = processDefinition;
    this.list = {};
};

// Model functions

User.prototype.readUser = function(data, success, error) {
    // Wrap data
    var self = this;
    var user = {};
    var activityId = this.processDefinition.mainProcess.id;

    if (!is_defined(this.processDefinition))
        return;
    this.processDefinition.processes.forEach(function(process) {
        if (!is_defined(process.flowElements))
            return false;
        process.flowElements.forEach(function(subprocess){
            if (is_defined(subprocess.assignee)) {
                if (!(subprocess.candidateGroups[0] in user)) {
                    user[subprocess.candidateGroups[0]] = {};
                }
                if (!is_defined(user[subprocess.candidateGroups[0]].task)) {
                    user[subprocess.candidateGroups[0]].task = [];
                }
                var t = {};
                t.id = subprocess.id;
                t.name = subprocess.name;
                t.category = subprocess.category;
                t.activity = activityId;
                t.documentation = subprocess.documentation;
                user[subprocess.candidateGroups[0]].task.push(t);
            }
            if (!is_defined(subprocess.flowElements))
                return false;
            subprocess.flowElements.forEach(function(element){
                if (!is_defined(element.assignee))
                    return false;
                if (!(element.candidateGroups[0] in user)) {
                    user[element.candidateGroups[0]] = {};
                }
                if (!is_defined(user[element.candidateGroups[0]].task)) {
                    user[element.candidateGroups[0]].task = [];
                }
                var t = {};
                t.id = element.id;
                t.name = element.name;
                t.category = element.category;
                t.activity = activityId;
                t.documentation = element.documentation;
                user[element.candidateGroups[0]].task.push(t);
            }, self);
        }, self);
    }, self);


    // ICSM-Huawei Role names mapping
    if (data == "Huawei") {
        var role = Object.keys(user);
        for (var i = 0; i < role.length; i++) {
            if (!(Huawei_role[role[i]] in self.list)) {
                self.list[Huawei_role[role[i]]] = {};
                self.list[Huawei_role[role[i]]].task = [];
            }
            self.list[Huawei_role[role[i]]].task = self.list[Huawei_role[role[i]]].task.concat(user[role[i]].task);
        }
    } else {
        self.list = user;
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

    return this.list;
};

// UNDEFINED BELOW

User.prototype.createUser = function(data, success, error) {
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

User.prototype.updateUser = function(search, update, success, error) {
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

User.prototype.deleteUser = function(data, success, error) {
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


