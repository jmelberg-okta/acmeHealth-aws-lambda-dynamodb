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
    var id = event.body.id;
    var status = event.body.status;
    var date = new Date();
    var lastUpdated = String(date.toJSON());

    var params = {
      TableName: 'appointments',
      Key: {'id': {"S" : id }},
      AttributeUpdates: {
            "status": {
                "Value": { "S": status },
                "Action": "PUT"
            },
            "lastUpdated" : {
                "Value": {"S": lastUpdated },
                "Action": "PUT"
            }
        },
      ReturnValues: "ALL_NEW"
    }

    db.updateItem(params, function(err, data) {
    if (err) {
      RESPONSE.ERROR.message = err;
      callback(null, RESPONSE.ERROR);
    }
    else {
      RESPONSE.OK = data.Attributes;
      callback(null, RESPONSE.OK);  
    }
  });
 
};