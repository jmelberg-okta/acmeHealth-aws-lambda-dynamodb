'use strict';

var aws = require('aws-sdk');
var db = new aws.DynamoDB();

exports.handler = (event, context, callback) => {
  const RESPONSE = {
    OK : {
      statusCode : 200,
      message: [],
    },
    ERROR : {
      status : 400,
      message: "Unexpected Error. Please try again."
    }
  };
  
  return callback(null, getProviders());

  function getProviders() {
      RESPONSE.OK.message = [
        {
          "id" : "00u80l4aziQTF1NNH0h7",
          "name" : "Dr. John Doe",
          "profileImageUrl" : "https://raw.githubusercontent.com/jmelberg/acmehealth-swift/master/AcmeHealth/Assets.xcassets/0000001.imageset/0000001.png"
        },
        {
          "id" : "00u80l8xca6FLKQyT0h7",
          "name" : "Dr. Jane Doe",
          "profileImageUrl" : "https://raw.githubusercontent.com/jmelberg/acmehealth-swift/master/AcmeHealth/Assets.xcassets/0000002.imageset/0000002.png"
        },
        {
          "id" : "00u80l8xcoPyO4q3w0h7",
          "name" : "Dr. Richard Roe",
          "profileImageUrl" : "https://raw.githubusercontent.com/jmelberg/acmehealth-swift/master/AcmeHealth/Assets.xcassets/0000003.imageset/0000003.png"
        }
      ];
      return RESPONSE.OK;
  }
};