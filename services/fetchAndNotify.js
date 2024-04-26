const axios = require('axios');

async function fetchAndNotify() {
    const apiURL = process.env.API_URL;
    try {
        const apiResponse = await axios.get(apiURL);
        const connectors = apiResponse.data.data;
        return connectors.filter(connector => ['partial-outage', 'major-outage'].includes(connector.status))
            .map(connector => ({
                message: `:${connector.method === 'web' ? 'globe_with_meridians' : 'bank'}: *${connector.method.replace('-', ' ').toUpperCase()} Alert*: *${connector.institution.name}* (ID: ${connector.id}) is currently *${connector.status}*. :${connector.method === 'web' ? 'globe_with_meridians' : 'bank'}:`
            }));
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
}

module.exports = { fetchAndNotify };
