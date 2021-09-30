const serviceAccount = require('../fb-key.json')
const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const AWS = require('aws-sdk');
const SystemMessages = require('../common/SystemMessages');
const uuid = require ("uuid");
const SmsService = require('../common/SmsService');
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require('twilio')(twilioAccountSid, twilioAuthToken);
const { _200, _400 } = require('../common/API_Response');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const db = admin.firestore();
module.exports.handler = async (event, context, callback) => {
  /*  const { name, positionId, clientPhoneNumber, calendarLink } = JSON.parse(
        event.body
    );*/
    console.log(`Incoming message: ${JSON.stringify(event.body)}`);
    let relayNumber = "3145262241"


   let userPhone = (event.body.clientPhoneNumber + '').replace(/\D/g, '');
    let twilioRelayPhone = relayNumber.replace(/\D/g, '');
    let messageContent = (event.body.Body + '').replace(/\D/g, '');

    console.log('origin phone =', userPhone, 'target phone =', twilioRelayPhone, 'message body = ',event.body.calendarLink)
  /*  const jobsDB = db.collection('jobs');
    const openPositions = await db.collection('jobs').where('storeId', '==', event.body.Body).get()
    openPositions.forEach(position =>{
        console.log('retrieved positions from DB', position)
    })*/

    const smsService = new SmsService()
    //reply to user thanks for wanting to apply please follow these steps to get started
    const replyTwMessage ={
        from: twilioRelayPhone,
        to: userPhone,
        body: `Congratulations! You have been selected to schedule an interview with ACME company. The hiring manager is John Jimmy please follow the link to schedule your interview ${event.body.calendarLink}`
    }

    //TODO pull in hiring managers phone to identify the store and create conversation
    console.log('sending message reply to applicant', JSON.stringify(replyTwMessage))
    const twMessageInstance = await twilioClient.messages.create(replyTwMessage);
    console.log(`Twilio Response: ${JSON.stringify(twMessageInstance)}`);
    // todo possible save applicant info to user database
    return _200('Success!!!');
};
