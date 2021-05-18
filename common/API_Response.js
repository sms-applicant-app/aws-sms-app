'use strict'

const defaultHeaders = {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': 'https://app.card.date',
	'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

const Responses = {
    _200(data = {}) {
		console.log(`Returning 200: ${data}`);
        return {
            headers: defaultHeaders,
            statusCode: 200,
            body: data.body,
        };
    },

    _400(data = {}) {
		console.log(`Returning 400: ${data}`);
        return {
            headers: defaultHeaders,
            statusCode: 400,
            body: JSON.stringify(data),
        };
	},
	
	_404(data = null) {
		console.log(`returning 404: ${data}`);
		return {
			headers: defaultHeaders,
			statusCode: 404,
			body: JSON.stringify(data),
		};
	},

	_500(data = {}) {
		console.log(`Returning 500: ${data}`);
		return {
			headers: defaultHeaders,
			statusCode: 500,
			body: JSON.stringify(data),
		}
	}
};

module.exports = Responses;
