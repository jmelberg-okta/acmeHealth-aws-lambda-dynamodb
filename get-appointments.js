'use strict';

var aws = require('aws-sdk');
var db = new aws.DynamoDB.DocumentClient();

const RESPONSE = {
  OK : {
    statusCode : 200,
    message: [],
  },
  ERROR : {
    status : 400,
    message: "Something went wrong. Please try again."
  }
};

exports.handler = (event, context, callback) => {
  var id = event.filter;
  var appointments = [];
  
    db.scan({
        TableName: "appointments"
    }, function(err, data) {
      if (err) {
        callback(null, RESPONSE.ERROR);
      }
      else {
         for(var i = 0; i < data.Items.length; i++){
            if(data.Items[i].patientId == id || data.Items[i].providerId == id) {
                appointments.push(data.Items[i]);
            }
         }
         RESPONSE.OK.message = appointments;
         callback(null, RESPONSE.OK);
      }
  });
};