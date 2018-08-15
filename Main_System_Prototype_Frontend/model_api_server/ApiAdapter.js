
function is_defined(x) {
    return typeof x !== 'undefined';
}

function is_object(x) {
    return Object.prototype.toString.call(x) === "[object Object]";
}

function is_array(x) {
    return Object.prototype.toString.call(x) === "[object Array]";
}

var ApiAdapter = {};

// CRUD: createOne.
// "collection" must be specified by the first parameter.
// "data" must be specified as an object passed in by the second parameter.
// Example,
// collection : "table1",
// data : {"entity1" : 1}
ApiAdapter.createOne = function(collection, data, successCB, errorCB) {
    if (is_defined(collection) && is_defined(data) && !is_array(data)) {
        var body = {
            collection : collection,
            data : JSON.stringify(data)
        };
        this.ajaxCall("create", body, successCB, errorCB);
    } else {
        // Error handling
        errorCB("Error: " + "Invalid Parameters");
    }
};

// CRUD: createMany.
// "collection" must be specified in by the first parameter.
// "data" must be specified as an Array by the second parameter.
// Example,
// collection : "table1",
// data : [{"entity1" : 1}, {"entity2" : 2}]
ApiAdapter.createMany = function(collection, data, successCB, errorCB) {
    if (is_defined(collection) && is_defined(data) && is_array(data)) {
        var body = {
            collection : collection,
            data : JSON.stringify(data)
        };
        this.ajaxCall("create", body, successCB, errorCB);
    } else {
        // Error handling
        errorCB("Error: " + "Invalid Parameters");
    }
};

// CRUD: ReadOne.
// "collection" must be specified in by the first parameter.
// "data" must be specified as an object by the second parameter.
// Example,
// collection : "table1",
// data : {"_id", "57d26068f2a81b5d740f695c"} or
// data : {"x" : 1234}
ApiAdapter.readOne = function(collection, data, successCB, errorCB) {
    if (is_defined(collection) && is_defined(data)) {
        var body;
        if (is_defined(data._id)) {
            body = {
                collection : collection,
                _id : data._id
            };
        } else {
            body = {
                collection : collection,
                data : JSON.stringify(data)
            };
        }
        this.ajaxCall("readOne", body, successCB, errorCB);
    } else {
        // Error handling
        errorCB("Error: " + "Invalid Parameters");
    }
};

// CRUD: readAll.
// "collection" must be specified in by the first parameter.
// "data" must be specified as an object by the second parameter.
// Example,
// collection : "table1",
// data : {"x" : 1234}
ApiAdapter.readAll = function(collection, body, successCB, errorCB) {
    if (is_defined(collection) && is_defined(data)) {
        var body = {
            collection : collection,
            data : JSON.stringify(data)
        };
        this.ajaxCall("readAll", body, successCB, errorCB);
    } else {
        // Error handling
        errorCB("Error: " + "Invalid Parameters");
    }
};

// CRUD: update.
// "collection" must be specified in by the first parameter.
// "data" must be specified as an object by the second parameter.
// Example,
// collection : "table1",
// data : {_id : "57d25c9cf2a81b5d740f6956", newData : {x:5678, y:2222}} or
// data : {oldData: {y:2222}, newData : {z:5678, y:2222}}
ApiAdapter.update = function(collection, data, successCB, errorCB) {
    if (is_defined(collection) && is_defined(data)) {
        var body;
        if (is_defined(data._id) && is_defined(data.newData) && !is_array(data.newData)) {
            body = {
                collection : collection,
                _id : data._id,
                newData: JSON.stringify(data.newData)
            };
        } else if (is_defined(data.oldData) && is_defined(data.newData) &&
            !is_array(data.oldData) && !is_array(data.newData)) {
            body = {
                collection : collection,
                oldData : JSON.stringify(data.oldData),
                newData: JSON.stringify(data.newData)
            };
        } else {
            errorCB("Error: " + "Invalid Parameters");
            return;
        }
        this.ajaxCall("update", body, successCB, errorCB);
    } else {
        // Error handling
        errorCB("Error: " + "Invalid Parameters");
    }
};

// CRUD: delete.
// "collection" must be specified in by the first parameter.
// "data" must be specified as an object by the second parameter.
// Example,
// collection : "table1",
// data : {"x" : [{"x":1111}, {"y":3333}]} or
// data : {"y" : 2222} or
// data : {"_id" : "57d26068f2a81b5d740f695c"}
ApiAdapter.delete = function(collection, data, successCB, errorCB) {
    if (is_defined(collection) && is_defined(data)) {
        var body;
        if (is_defined(data._id)) {
            body = {
                collection : collection,
                _id : data._id
            };
        } else {
            body = {
                collection : collection,
                data : JSON.stringify(data)
            };
        }
        this.ajaxCall("delete", body, successCB, errorCB);
    } else {
        // Error handling
        errorCB("Error: " + "Invalid Parameters");
    }
};

ApiAdapter.ajaxCall = function(operation, body, successCB, errorCB) {
    $.ajax({
        "url": ApiAdapter_config.node_server_url + operation,
        "method": "POST",
        "content-Type": "application/json; charset=utf-8",
        "data": body,
        "success": function(result){
            successCB(result);
        },
        "error":  function(xhr, ajaxOptions, thrownError) {
            errorCB("Error: " + thrownError);
        }
    });
}

ApiAdapter.uploadFile = function(body, successCB, errorCB) {
    $.ajax({
        "url": ApiAdapter_config.node_server_url + "uploadFile",
        "method": "POST",
        "data": body,
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": body,
        "success": function(result){
            successCB(result);
        },
        "error":  function(xhr, ajaxOptions, thrownError) {
            errorCB("Error: " + thrownError);
        }
    });
}






