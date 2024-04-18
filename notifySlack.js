const { WebClient } = require('@slack/web-api');

const slackClient = new WebClient(process.env.SLACK_TOKEN);

async function notifySlack(message) {
    try {
        await slackClient.chat.postMessage({
            channel: process.env.SLACK_CHANNEL_ID,
            text: message,
        });
        process.exit(0); // Success
    } catch (error) {
        console.error('Slack Error:', error);
        process.exit(1); // Error
    }
}

notifySlack(process.argv[2]); // Pass message as command line argument
