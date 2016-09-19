'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = 'amzn1.ask.skill.48389e54-7f5a-4041-9026-23efe729de85';
var SKILL_NAME = 'ufc information';

/**
 * Array containing ufc facts.
 */
var FACTS = [
    "The Ultimate Fighting Championship was created in November 1993.",
    "The UFC sold for 4 billion dollars in 2016.",
    "The UFC has 10 weight classes. The men's division has eight and the woman's division has two.",
    "Dana White instructed boxercise to women before he became the UFC boss.",
    "The UFC employs over 640 fighters, with about 70 of them being female.",
    "Each UFC fight has 3 rounds and main events are 5 rounds.",
    "Every UFC round is 5 minutes.",
    "Groin shots are not legal. We do have some rules you know.",
    "The UFC owns exclusive rights to hold MMA fights within an 8-sided, Octagon cage design fighting arena for MMA events.",
    "The youngest UFC champion ever was Jon Jones at 23 years old.",
    "The oldest UFC champion ever was Randy Couture.",
    "Tito Ortiz and Frank Mir are tied for most UFC bouts at 27.",
    "George St-Pierre and Michael Bisping are tied for the most UFC wins at 19.",
    "The UFC fighter with the most knock outs is Vitor Belfort, with a dozen <say-as interpret-as='characters'>k</say-as>oh's.",
    "Royce Gracie still has the most submissions with 11."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random ufc fact from the ufc facts list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        var prefixes = ["", "Here's your fact: ", "Here's some trivia: "];
        var prefixIndex = Math.floor(Math.random() * prefixes.length);
        var randomPrefix = prefixes[prefixIndex];

        // Create speech output
        var speechOutput = `${randomPrefix}${randomFact}`;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a ufc fact, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};