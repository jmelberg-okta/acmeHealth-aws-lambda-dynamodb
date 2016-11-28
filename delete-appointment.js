'use strict';

var aws = require('aws-sdk');
var db = new aws.DynamoDB();

const RESPONSE = {
  OK : {
    statusCode : 200,
    message: {},
  },
  ERROR : {
    status : 400,
    message: "Unexpected Error. Please try again."
  }
};

exports.handler = (event, context, callback) => {
    // Manually update "lastUpdated" field
    var id = event.filter;

    var params = {
      TableName: 'appointments',
      Key: {'id': {"S" : id }},
    }

    db.deleteItem(params, function(err, data) {
    if (err) {
      RESPONSE.ERROR.message = err;
      callback(null, RESPONSE.ERROR);
    }
    else {
      callback(null, RESPONSE.OK);  
    }
  });
 
};