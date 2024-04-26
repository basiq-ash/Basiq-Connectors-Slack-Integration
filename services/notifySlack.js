const { WebClient } = require('@slack/web-api');

const slackClient = new WebClient(process.env.SLACK_TOKEN);

async function notifySlack(message) {
    try {
        await slackClient.chat.postMessage({
            channel: process.env.SLACK_CHANNEL_ID,
            text: message,
        });
    } catch (error) {
        console.error('Slack Error:', error);
        throw error;
    }
}

module.exports = { notifySlack };
