'use strict';
const Responses = require('../common/API_Response');
const Dynamo = require('../common/Dynamo');
const SmsService = require('../common/SmsService');
const admin = require('firebase-admin');
const serviceAccount = require('../fb-key.json')
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});
const AWS = require('aws-sdk');
const SystemMessages = require('../common/SystemMessages');
const uuid = require ("uuid");
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require('twilio')(twilioAccountSid, twilioAuthToken);
const { _200, _400 } = require('../common/API_Response');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const db = admin.firestore();
module.exports.handler = async (event, context, callback) => {
	console.log(`Incoming message: ${JSON.stringify(event.body)}`);
		// (314) 526-2241 twilio relay number


		let userPhone = (event.body.From + '').replace(/\D/g, '');
		let twilioRelayPhone = (event.body.To + '').replace(/\D/g, '');
		let messageContent = (event.body.Body + '').replace(/\D/g, '');

		console.log('origin phone =', userPhone, 'target phone =', twilioRelayPhone, 'message body = ', event.body.Body)
		const jobsDB = db.collection('jobs');
		const openPositions = await db.collection('jobs').where('storeId', '==', event.body.Body).get()
	openPositions.forEach(position =>{
		console.log('retrieved positions from DB', position)
	})

			const smsService = new SmsService()
			//reply to user thanks for wanting to apply please follow these steps to get started
			const replyTwMessage ={
				from: twilioRelayPhone,
				to: userPhone,
				body: `Thanks for wanting to apply. Please follow these steps to get started https://applicant.hirenow.us/positions/${event.body.Body}`
			}

			//TODO pull in hiring managers phone to identify the store and create conversation
			console.log('sending message reply to applicant', JSON.stringify(replyTwMessage))
			const twMessageInstance = await twilioClient.messages.create(replyTwMessage);
			console.log(`Twilio Response: ${JSON.stringify(twMessageInstance)}`);
			// todo possible save applicant info to user database
			return _200('Success!!!');

		const twMessage = {
			from: (event.body.From + '').replace(/\D/g, ''),
			to: (event.body.To +   '').replace(/\D/g, ''),
			body: (event.body.Body + '').replace(/\D/g, '')
		}


	//const twMessageInstance = await twilioClient.messages.create(twMessage);
	console.log(`Twilio Response: ${JSON.stringify(twMessageInstance)}`);
	return _200('Success!!!');

		// call the store by ID and relay the message from applicant to hiring manager
	// get conversation where the user is origin phone and the proxy phone are in the same conversation
/*	const convoWithOriginPhoneAndTargetPhone = await DynamoDB.Query({
		TableName: 'conversation-temp',
		IndexName: 'UserPhoneIndex',
		KeyConditionExpression: 'userPhone = :originPhone and lightPhoneProxy = :targetPhone',
		ExpressionAttributeValues:{
			':userPhone': originPhone,
			':lightPhone': targetPhone
		},
	},
		'conversation with user phone and target phone'
	);
	console.log('new conversation query to find conversation with both proxy number and convo proxy', convoWithOriginPhoneAndTargetPhone.Items[0]);*/
	// Get conversations where the origin phone number is the user
/*	const userConvQueryResult = await DynamoDB.Query({
			TableName: 'conversation',
			IndexName: 'UserPhoneIndex',
			KeyConditionExpression: 'userPhone = :userPhone ',
			ExpressionAttributeValues: {':userPhone': originPhone}
		},
		'User Conversation Query');

	console.log('conversations user is in', userConvQueryResult.Items[0]);


	const isHiringManager = userConvQueryResult.Items.filter(c => originPhone === c.userPhone && targetPhone === c.lightPhoneProxy)[0];
	console.log('is user userConvResults', isUser);
	if (isUser)
	{
		const userQueryResult = await DynamoDB.Query({
			TableName: 'user-temp',
			IndexName: 'PhoneNumberIndex',
			KeyConditionExpression: 'phoneNumber = :phoneNumber',
			ExpressionAttributeValues: { ':phoneNumber': originPhone }
		}, 'User Query');

		const user = userQueryResult.Items[0];

		if (user.messagesAllowed < 1)
			return _400('User has exceeded message allowance');

		const sendMessageResult = await getConversationAndSendMessage(userConvQueryResult.Items, originPhone, targetPhone, isUser, user.firstName, messageContent);

		const newMessageCount = user.messagesAllowed -= 1;
		console.log('user to update with new message count',JSON.stringify(newMessageCount), JSON.stringify(user));
		const db = new AWS.DynamoDB.DocumentClient();
		const userUpdateResult = await db.put({
			TableName: 'user',
			Item: user
		})
			.promise();
		console.log(`User update message count results: ${JSON.stringify(userUpdateResult)}`);

		return sendMessageResult;
	}
	else
	{
		// Get the conversations where the origin phone number is the lightuser
		const lightConvQueryResult = await DynamoDB.Query({
			TableName: 'conversation-temp',
			IndexName: 'LightPhoneIndex',
			KeyConditionExpression: 'lightPhone = :lightPhone',
			ExpressionAttributeValues: {':lightPhone': originPhone}
		},
		'LightUser Conversation Query');
		const userConvOriginPhone = userConvQueryResult.Items[0];
		 //const conversationId = userConvOriginPhone.ID;
		 //const updateConvoStatus = await getConversationRefreshDate(conversationId, messageContent).then();
		 // console.log(`update convo state: ${updateConvoStatus}`);
		return await getConversationAndSendMessage(lightConvQueryResult.Items, originPhone, targetPhone, isUser, null, messageContent);
	}*/
};
