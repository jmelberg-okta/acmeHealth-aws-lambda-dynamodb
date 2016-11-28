'use strict';

var aws = require('aws-sdk');
var db = new aws.DynamoDB.DocumentClient();

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
    var newAppointment = event;

    // Format startTime
    var date = new Date();
    var startTime = new Date(newAppointment.startTime);
    var startTime_s = String(startTime.toJSON());

    // Format endTime
    var endTime = new Date(startTime_s);
    var endTime_date = new Date(endTime.setHours(endTime.getHours() + 1));
    
    var newAppointment = {
        id: uuid(),
        status: "REQUESTED",
        created: String(date.toJSON()),
        lastUpdated: String(date.toJSON()),
        startTime: String(startTime.toJSON()),
        endTime: String(endTime_date.toJSON()),
        location:  "Office",
        comment: event.comment,
        providerId: event.providerId,
        patient: event.patient,
        patientId: event.patientId
    };

    db.put({  TableName: 'appointments', Item: newAppointment },function(err, data) {
        if (err) { RESPONSE.ERROR.message = err; callback(null, RESPONSE.ERROR); }
        else {
            RESPONSE.OK = newAppointment;
            callback(null, RESPONSE.OK);
        }
  });
 
};

function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}