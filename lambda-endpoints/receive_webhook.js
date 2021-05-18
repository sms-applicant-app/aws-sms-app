'use strict';
const Responses = require('../common/API_Response');
const Dynamo = require('../common/Dynamo');
const SmsService = require('../common/SmsService');
const AWS = require('aws-sdk');
const SystemMessages = require('../common/SystemMessages');
const uuid = require ("uuid");
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require('twilio')(twilioAccountSid, twilioAuthToken);
const { _200, _400 } = require('../common/API_Response');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
module.exports.handler = async (event, context, callback) => {
	const twiml = new MessagingResponse();
	console.log(`Incoming message: ${JSON.stringify(event.body)}`);
	twiml.message('The Robots are coming! Head for the hills!');

		const originPhone = (event.body.From + '').replace(/\D/g, '');
		const targetPhone = (event.body.To + '').replace(/\D/g, '');
		const messageContent = event.body.Body;

		console.log('origin phone =', originPhone, 'target phone =', targetPhone, 'message body = ', messageContent)

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
