'use strict';
const AWS = require('aws-sdk');
const { _200, _400 } = require('../common/API_Response');

module.exports.handler = async (event) => {

    console.log(`Received Event:${JSON.stringify(event.body)}`);
    const user = event.body;
    const createdUser = await createUser(user);
    const defaultHeaders = {
        'Access-Control-Allow-Origin': '*', // <-- Add your specific origin here
        'Access-Control-Allow-Credentials': true,
    };
    return _200(  {body: createdUser.Items});
};


async function createUser (user){
    console.log(`user being passed in: ${JSON.stringify(user)}`);
    const userObj = user;
    console.log(`userObj: ${JSON.stringify(userObj)}`);
    const db = new AWS.DynamoDB.DocumentClient();
    const savedUser = await db.put({TableName: 'user-temp', Item: userObj}).promise();
    console.log(`New User:  ${JSON.stringify(savedUser)}`);

    return savedUser;
}
