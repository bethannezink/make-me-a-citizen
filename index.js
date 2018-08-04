const dotenv = require('dotenv').config();
const Alexa = require('ask-sdk');

let skill;


function canHandleIntent(intentName, handlerInput) {
	const request = handlerInput.requestEnvelope.request;

	return request.type === 'IntentRequest' && request.intent.name === intentName;
}

const LaunchRequestHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
	},
	handle(handlerInput) {
		let speechOutput = 'Launch Speech';

		return handlerInput.responseBuilder
			.speak(speechOutput)
			.reprompt(speechOutput)
			.withShouldEndSession(false)
			.withSimpleCard('Launch', speechOutput)
			.getResponse();
	}
};

const PracticeIntentHandler = {
	canHandle(handlerInput) {
		return canHandleIntent('Practice', handlerInput);
	},
	handle(handlerInput) {
		let speechOutput = 'Time for practice!';

		return handlerInput.responseBuilder
			.speak(speechOutput)
			.reprompt(speechOutput)
			.withShouldEndSession(false)
			.withSimpleCard('Practice', speechOutput)
			.getResponse();
	}
};

const TestIntentHandler = {
	canHandle(handlerInput) {
		return canHandleIntent('Test', handlerInput);
	},
	handle(handlerInput) {
		let speechOutput = 'Time for the test!';

		return handlerInput.responseBuilder
			.speak(speechOutput)
			.reprompt(speechOutput)
			.withShouldEndSession(false)
			.withSimpleCard('Test', speechOutput)
			.getResponse();
	}
};

const CancelIntentHandler = {
	canHandle(handlerInput) {
		return canHandleIntent('AMAZON.CancelIntent', handlerInput);
	},
	handle(handlerInput) {
		let speechOutput = 'Cancel Speech';

		return handlerInput.responseBuilder
			.speak(speechOutput)
			.reprompt(speechOutput)
			.withShouldEndSession(false)
			.withSimpleCard('Cancel', speechOutput)
			.getResponse();
	}
};

const FallbackIntentHandler = {
	canHandle(handlerInput) {
		return canHandleIntent('AMAZON.FallbackIntent', handlerInput);
	},
	handle(handlerInput) {
		let speechOutput = 'Fallback Speech';

		return handlerInput.responseBuilder
			.speak(speechOutput)
			.reprompt(speechOutput)
			.withShouldEndSession(false)
			.withSimpleCard('Fallback', speechOutput)
			.getResponse();
	}
};

const HelpIntentHandler = {
	canHandle(handlerInput) {
		return canHandleIntent('AMAZON.HelpIntent', handlerInput);
	},
	handle(handlerInput) {
		const speechOutput = 'Help Speech';

		return handlerInput.responseBuilder
			.speak(speechOutput)
			.reprompt(speechOutput)
			.withShouldEndSession(false)
			.withSimpleCard('Help', speechOutput)
			.getResponse();
	}
};

const StopIntentHandler = {
	canHandle(handlerInput) {
		return canHandleIntent('AMAZON.StopIntent', handlerInput);
	},
	handle(handlerInput) {
		let speechOutput = 'Stop Speech';

		return handlerInput.responseBuilder
			.speak(speechOutput)
			.reprompt(speechOutput)
			.withShouldEndSession(false)
			.withSimpleCard('Stop', speechOutput)
			.getResponse();
	}
};

const ErrorHandler = {
	canHandle() {
		return true;
	},
	handle(handlerInput, error) {
		let speechOutput = 'Error Speech';
		console.log(`Error handled: ${error}`);

		return handlerInput.responseBuilder
			.speak(speechOutput)
			.reprompt(speechOutput)
			.withShouldEndSession(false)
			.withSimpleCard('Error', speechOutput)
			.getResponse();
	}
};

exports.handler = async function (event, context) {
	console.log(`REQUEST: ${JSON.stringify(event)}`);

	if (!skill) {
		skill = Alexa.SkillBuilders.custom()
			.addRequestHandlers(
				LaunchRequestHandler,
				CancelIntentHandler,
				FallbackIntentHandler,
				HelpIntentHandler,
				PracticeIntentHandler,
				StopIntentHandler,
				TestIntentHandler)
			.addErrorHandlers(ErrorHandler)
			.create();
	}

	return skill.invoke(event, context);
}