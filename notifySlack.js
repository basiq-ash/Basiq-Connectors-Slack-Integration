const { WebClient } = require('@slack/web-api');
const { fetchAndNotify } = require('./fetchAndNotify');

const slackClient = new WebClient(process.env.SLACK_TOKEN);

async function notifySlack() {
    try {
        const messages = await fetchAndNotify(slackClient);
        if (messages.length > 0) {
            for (const message of messages) {
                await slackClient.chat.postMessage({
                    channel: process.env.SLACK_CHANNEL_ID,
                    text: message,
                });
            }
        }
    } catch (error) {
        console.error('Slack Error:', error);
    }
}

notifySlack();
