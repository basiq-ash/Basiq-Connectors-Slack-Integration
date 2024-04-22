const { WebClient } = require('@slack/web-api');
const express = require('express');
const axios = require('axios');

require('dotenv').config();

const slackClient = new WebClient(process.env.SLACK_TOKEN);
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/status', async (req, res) => {
    try {
        const apiResponse = await axios.get('https://au-api.basiq.io/public/connectors?filter=connector.stage.ne(%27alpha%27),connector.authorization.type.in(%27other%27,%27user%27,%27user-mfa%27,%27user-mfa-intermittent%27,%27token%27)');
        const connectors = apiResponse.data.data;

        connectors.forEach(connector => {
            console.log(`Connector ID: ${connector.id}, Status: ${connector.status}`);
            // Notify on Slack if a connector is not operational
            if (connector.status !== 'operational') {
                const message = `:warning: Alert: *${connector.institution.name}* (ID: ${connector.id}) status is *${connector.status}*. :warning:`;
                notifySlack(message);
            }
        });

        res.json(connectors);
    } catch (error) {
        console.error('Failed to fetch data:', error);
        if (!res.headersSent) {
            res.status(500).send("Failed to fetch data from Basiq API.");
        }
        if (error.code === 'slack_webapi_platform_error' && error.data && error.data.error === 'rate_limited') {
            // If rate limited, wait for a progressively increasing time before retrying
            const waitTime = Math.pow(2, error.retryAfter || 1) * 1000;
            console.warn(`Rate limited by Slack API. Retrying in ${waitTime / 1000} seconds.`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
            // Retry the failed request
            await notifySlack(message);
        } else {
            console.error('Slack Error:', error);
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/api/status`);
});

async function notifySlack(message) {
    try {
        await slackClient.chat.postMessage({
            channel: process.env.SLACK_CHANNEL_ID,
            text: message,
        });
    } catch (error) {
        console.error('Slack Error:', error);
    }
}
