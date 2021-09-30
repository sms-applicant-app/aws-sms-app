'use strict';
// request incoming from webhook
// const request = require('request');
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require('twilio')(twilioAccountSid, twilioAuthToken);

// Required in responses for CORS support to work
const headers = {'Access-Control-Allow-Origin': '*'};

module.exports.sendSms = (event, context, callback) => {
    const sms = {
        body: 'Thank you Brandon for your intrest in applying to ########### please go to this link https://hr-sms.com',
        to: '+13145995164',  // your phone number
        from: '+13142075672' // a valid Twilio number
        //to: event.body.to,
       // body: event.body.message || '',
       // from: event.body.from
        // andrews phone number 3149714030
    };
};
