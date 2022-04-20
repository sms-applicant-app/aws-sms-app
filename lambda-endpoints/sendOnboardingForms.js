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
async function sendWelcomeMessageToNewHire(name, applicantPhone, twilioRelayPhone, linkToOnboardPapers, hiringManagerName, storePhone, startDate){

    const smsService = new SmsService()
    await new Promise((Resolve, Reject) =>{
        try {
            smsService.send(applicantPhone, twilioRelayPhone, SystemMessages.applicantSelectedForHire(name, linkToOnboardPapers, hiringManagerName, storePhone, startDate)).then(resp =>{
                Resolve(resp)
            })
        } catch {
            Reject('Something happened')
        }

    })
   /* await Promise.allSettled([
        smsService.send(applicantPhone, twilioRelayPhone, SystemMessages.applicantSelectedForHire(name, franchiseName,linkToOnboardPapers, hiringManagerName, storePhone, startDate))
    ])*/
    return _200('Success!!!');
}
module.exports.handler = async (event, context, callback) => {
    console.log(`Incoming message: ${JSON.stringify(event.body)}`);
    let relayNumber = "3145262241"
    let keyToOnboardLinks = event.body.linkToOnboardingForms
    let applicantPhone = (event.body.applicantPhone + '').replace(/\D/g, '');
    let twilioRelayPhone = relayNumber.replace(/\D/g, '');
    let messageContent = (event.body.Body + '').replace(/\D/g, '');
    let name = event.body.name;
    let keyToOnboardPapers = `https://applicant.hirenow.us/onboarding/${keyToOnboardLinks}` ;
    let hiringManagerName = event.body.hiringManagersName;
    let storePhone = event.body.storePhone;
    let startDate = event.body.startDate;
    console.log('origin phone =', applicantPhone, 'target phone =', twilioRelayPhone, 'message body = ',event.body)
    /*  const jobsDB = db.collection('jobs');
      const openPositions = await db.collection('jobs').where('storeId', '==', event.body.Body).get()
      openPositions.forEach(position =>{
          console.log('retrieved positions from DB', position)
      })*/
    const sendMessageToApplicant = await sendWelcomeMessageToNewHire(name, applicantPhone, twilioRelayPhone, keyToOnboardPapers, hiringManagerName, storePhone, startDate)
    console.log('sending message', sendMessageToApplicant)
    return sendMessageToApplicant
};
