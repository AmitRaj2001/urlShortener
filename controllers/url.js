const shortid = require("shortid");
const URL = require("../models/url");


async function handleGenerateNewShortURL(req, res) {
	const shortId = shortid.generate();
	const body = req.body;
	if (!body.url) {
		return res.status(400).json({ error: "URL is required" });
	}
	await URL.create({
		shortId: shortId,
		redirectUrl: body.url,
		visitHistory: [],
	});

	return res.json({ id: shortId });
}

async function handleGetAnalytics(req, res) {
	const shortId = req.params.shortId;
	const result = await URL.findOne({ shortId });
	return res.json({
		totalClicks: result.visitHistory.length,
		analytics: result.visitHistory,
	});
}

async function handleGetUrlByID(req, res) {
    const shortId = req.params.amit;
    console.log(shortId);
    console.log(req.query.x);
	const entry = await URL.findOneAndUpdate(
		{
			shortId,
		},
		{
			$push: {
				visitHistory: {
					timestamp: Date.now(),
				},
			},
		}
	);
	return res.redirect(entry.redirectUrl);
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleGetUrlByID,
};
