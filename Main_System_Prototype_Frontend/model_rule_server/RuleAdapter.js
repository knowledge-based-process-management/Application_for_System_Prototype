function is_defined(x) {
    return typeof x !== 'undefined';
}

function is_object(x) {
    return Object.prototype.toString.call(x) === "[object Object]";
}

function is_array(x) {
    return Object.prototype.toString.call(x) === "[object Array]";
}

function is_string(x) {
    return typeof x === "string";
}

var RuleAdapter = {};

// container : string, name of the the deployed container.
// data : object, should be empty object. e.g. data = {}
RuleAdapter.queryRule = function(container, data, successCB, errorCB) {
    var operation = "kie-server/services/rest/server/containers/instances/" + container;
    if (is_defined(operation) && is_defined(data)) {
        var body = {
          "lookup" : "defaultKieSession",
          "commands" : [ {
            "insert" : {
              "object" : { 
                "demo.Evidence" : data
              },
              "out-identifier" : "result",
              "return-object" : true,
              "entry-point" : "DEFAULT"
            }

          }, {
            "fire-all-rules" : { }
          } ]
        };
        this.ajaxCall(operation, "POST", body, successCB, errorCB);
    } else {
        // Error handling
        errorCB("[Error] " + "Invalid Parameters");
    }
};

// TODO: 
// Any other new requirements


// Utilities

RuleAdapter.ajaxCall = function(operation, method, body, successCB, errorCB) {
    var self = this;
    $.ajax({
        "url": encodeURI(RuleAdapter_config.method + RuleAdapter_config.server + operation),
        "method": method,
        "data": JSON.stringify(body),
        "beforeSend" : function (xhr) {
            xhr.setRequestHeader("Authorization", self.make_base_auth(RuleAdapter_config.user, RuleAdapter_config.pass));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Accept", "application/json");
        },
        "success": function(result){
            successCB(result);
        },
        "error":  function(xhr, ajaxOptions, thrownError) {
            errorCB("[Error] " + xhr.responseText);
        }
    });
}

RuleAdapter.make_base_auth = function(user, password) {
    var tok = user + ':' + password;
    var hash = btoa(tok);
    return "Basic " + hash;
}





