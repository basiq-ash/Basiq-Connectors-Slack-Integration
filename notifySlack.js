const { WebClient } = require('@slack/web-api');
const { fetchAndNotify } = require('./fetchAndNotify');

const slackClient = new WebClient(process.env.SLACK_TOKEN);

async function notifySlack(message) {
    try {
        await fetchAndNotify(slackClient, notifySlack);
    } catch (error) {
        console.error('Slack Error:', error);
    }
}

notifySlack();
