
var utility = {};

utility.isObjectAttributesEqual = function(a, b) {

    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    // If names in properties are different,
    // objects are not equivalent
    for (var i = 0; i < aProps.length; i++) {
        if (aProps[i] != bProps[i])
        	return false;
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}

module.exports = utility;