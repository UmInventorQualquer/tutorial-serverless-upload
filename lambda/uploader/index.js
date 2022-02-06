'use strict'

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({
  region: process.env.AWS_REGION || 'us-east-1'
});
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const result = await getSignedUploadURL();
  console.log('Result: ', result);
  return result;
}

const getSignedUploadURL = async function() {
  const actionId = uuidv4();
  const expires = 30 * 60; // 30 minutes in seconds
  const fileExtension = '.jpg';

  const s3Params = {
    Bucket: process.env.UPLOAD_BUCKET,
    Key:  `${actionId}${fileExtension}`,
    ContentType: 'image/jpeg',
    Expires: expires
  };

  console.log('getUploadURL: ', s3Params);

  return new Promise((resolve, reject) => {
    resolve({
      "statusCode": 200,
      "isBase64Encoded": false,
      "headers": {
        "Access-Control-Allow-Origin": "*"
      },
      "body": JSON.stringify({
          "url": s3.getSignedUrl('putObject', s3Params),
          "fileName": `${actionId}${fileExtension}`
      })
    });
  });
}
