const express = require('express');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/errorHandler');
const statusRoutes = require('./routes/statusRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Routes
app.use('/api/status', statusRoutes);

<<<<<<< HEAD
        connectors.forEach(connector => {
            console.log(`Connector ID: ${connector.id}, Status: ${connector.status}, Method: ${connector.method}`);
            // Check method and operational status
            if (connector.status === 'partial-outage' || connector.status === 'major-outage') {
                if (connector.method === 'web') {
                    const message = `:globe_with_meridians: *Web Alert*: *${connector.institution.name}* (ID: ${connector.id}) is currently *${connector.status}*. :globe_with_meridians:`;
                    notifySlack(message);
                } else if (connector.method === 'open-banking') {
                    const message = `:bank: *Open-Banking Alert*: *${connector.institution.name}* (ID: ${connector.id}) is currently *${connector.status}*. :bank:`;
                    notifySlack(message);
                }
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
=======
// Global error handler
app.use(errorHandler);
>>>>>>> 696a714 (Code Optimisation)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
