const puppeteer = require('puppeteer');

async function startBrowser(){
	let browser;
	try {
	    console.log("Opening the browser......");
	    browser = await puppeteer.launch({
	        headless: false,
			defaultViewport: null,
			headless: false,
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
			// defaultViewport: {
			// 	width:1920,
			// 	height:1080
			// },
	        // args: ["--disable-setuid-sandbox"],
	        'ignoreHTTPSErrors': true
	    });
	} catch (err) {
	    console.log("Could not create a browser instance => : ", err);
	}
	return browser;
}

module.exports = {
	startBrowser
};