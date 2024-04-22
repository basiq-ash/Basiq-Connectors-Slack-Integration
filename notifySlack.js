const { WebClient } = require('@slack/web-api');

const slackClient = new WebClient(process.env.SLACK_TOKEN);

async function notifySlack(message) {
    try {
        await slackClient.chat.postMessage({
            channel: process.env.SLACK_CHANNEL_ID,
            text: message || 'Default message if message is empty', // Include a default message if `message` is empty
        });
    } catch (error) {
        console.error('Slack Error:', error);
    }
}

notifySlack(process.argv[2]); // Pass message as command line argument
