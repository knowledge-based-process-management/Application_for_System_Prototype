var Grid = require('gridfs-stream');
var mongodb = require('mongodb');
var moment = require('moment');
var path = require('path');

var utility = require('./utility.js');

var largeFile = {};

largeFile.attributes = {
	title : "",
    description : "",
    date : "",
    type : "",
    url : "",
    integrity : "",
    roleId : "",
    instanceId : "",
    actionId : ""
};

largeFile.upload = function(db, req, res) {
	var metadata = JSON.parse(req.body.metadata);
	if (!utility.isObjectAttributesEqual(largeFile.attributes, metadata)) {
		res.sendStatus(400);
		return;
	}
    var file = req.files.filefield;
    var gfs = new Grid(db, mongodb);
    var writeStream = gfs.createWriteStream({
        mode: 'w', 
        content_type: file.mimetype, 
        filename: file.name,
        metadata : metadata
    });
    writeStream.write(file.data); 
    writeStream.on('close', function (file) {
    	// console.log(moment().format('MM-DD-YYYY HH:MM:SS'), ": Upload successfully");
        res.status(200).send({
            message: "Upload successfully.",
            id: file._id 
        });
    });
    writeStream.end();
};

largeFile.download = function(db, req, res) {
	try {
        var gfs = new Grid(db, mongodb);
        gfs.findOne({
            '_id': req.params.id
        }, function (err, file) {
            // console.log(moment().format('MM-DD-YYYY HH:MM:SS'),"ID received: ", req.params.id);
            if (file == null) {
                return res.status(400).send({
                    message: 'File not found'
                });
            }
            res.set('Content-Type', file.contentType);
            var readstream = gfs.createReadStream({
                _id: file._id
            });
            readstream.on("error", function (err) {
                console.log("Got error while processing stream " + err.message);
                res.end();
            });
            readstream.pipe(res);
        });
    }
    catch (err) {
        // console.log(moment().format('MM-DD-YYYY HH:MM:SS'), 'EXCEPTION in /downloadFile: ', err);
        return res.status(400).send({
            message: "Exception encountered"
        });
    }
};


module.exports = largeFile;
