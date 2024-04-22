const { WebClient } = require('@slack/web-api');
const { fetchAndNotify } = require('./fetchAndNotify'); // Assuming the function is in fetchAndNotify.js

const slackClient = new WebClient(process.env.SLACK_TOKEN);

async function notifySlack() {
    try {
        await fetchAndNotify(slackClient);
    } catch (error) {
        console.error('Slack Error:', error);
    }
}

notifySlack();
