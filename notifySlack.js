const { WebClient } = require('@slack/web-api');

const slackClient = new WebClient(process.env.SLACK_TOKEN);

async function notifySlack(message) {
    try {
        await slackClient.chat.postMessage({
            channel: process.env.SLACK_CHANNEL_ID,
            text: message,  // Include the `text` argument with the message
        });
    } catch (error) {
        console.error('Slack Error:', error);
    }
}
notifySlack(process.argv[2]); // Pass message as command line argument
