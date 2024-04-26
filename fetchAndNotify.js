const axios = require('axios');

async function fetchAndNotify(slackClient) {
    try {
        const apiResponse = await axios.get('https://au-api.basiq.io/public/connectors?filter=connector.stage.ne(%27alpha%27),connector.authorization.type.in(%27other%27,%27user%27,%27user-mfa%27,%27user-mfa-intermittent%27,%27token%27)');
        const connectors = apiResponse.data.data;

        const messages = [];
        connectors.forEach(connector => {
            console.log(`Connector ID: ${connector.id}, Status: ${connector.status}, Method: ${connector.method}`);
            // Check method and operational status
            if (connector.status === 'partial-outage' || connector.status === 'major-outage') {
                if (connector.method === 'web') {
                    const message = `:globe_with_meridians: *Web Alert*: *${connector.institution.name}* (ID: ${connector.id}) is currently *${connector.status}*. :globe_with_meridians:`;
                    messages.push(message);
                } else if (connector.method === 'open-banking') {
                    const message = `:bank: *Open-Banking Alert*: *${connector.institution.name}* (ID: ${connector.id}) is currently *${connector.status}*. :bank:`;
                    messages.push(message);
                }
            }
        });

        return messages;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        // Handle error as needed
        return [];
    }
}

module.exports = { fetchAndNotify };
