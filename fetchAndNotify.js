const axios = require('axios');

async function fetchAndNotify(slackClient) {
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

        // res.json(connectors); // Assuming this line is not required here
    } catch (error) {
        console.error('Failed to fetch data:', error);
        // Handle error as needed
    }
}

module.exports = { fetchAndNotify };
