const { fetchAndNotify } = require('../services/fetchAndNotify');
const { notifySlack } = require('../services/notifySlack');

exports.getStatus = async (req, res, next) => {
    try {
        const messages = await fetchAndNotify();
        messages.forEach(message => notifySlack(message));
        res.json({ success: true, messages });
    } catch (error) {
        next(error);
    }
};
