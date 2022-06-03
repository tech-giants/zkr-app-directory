const pageScraper = require('./pageScraper');
async function scrapeAll(browserInstance,url){
	let browser;
	try{
		browser = await browserInstance;
		var d = await pageScraper.scraper(browser,url);	
		return d;
		
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

module.exports = (browserInstance,url) => scrapeAll(browserInstance,url)