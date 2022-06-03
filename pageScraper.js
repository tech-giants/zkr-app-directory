const scraperObject = {
	url: 'https://twitter.com/loopringorg',
	async scraper(browser,url){
		var post_count=0;

        let page = await browser.newPage();
		// console.log(`Navigating to ${this.url}...`);
		// Navigate to the selected page
		await page.goto(url);
		// Wait for the required DOM to be rendered
		await page.waitForSelector('article');
	
		// console.log("article appeard")
		// Get the link to all the required books
		//  await page.evaluate(async () => {
		// 	//  console.log("scroll position before scroll ",document.documentElement.scrollTop)
		// 	await window.scrollTo({top: 500}); 
		// 	// console.log("scroll position after scroll ",document.documentElement.scrollTop)
		//  })
		let urls_ = await page.evaluate(async () => {
			// console.log("scroll position in main ",document.documentElement.scrollTop)
			// console.log("page evaluate ")
			let results = [];
			let items = document.querySelectorAll('article');
			console.log("items =========>> ",items)
			for (let item of items) {
				// console.log(item.querySelector("div > div > div > div > div > div > "))
				try{
					// console.log(item.querySelector("a > time").innerText)
					// console.log(item.querySelector("div.css-901oao.r-18jsvk2.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0").innerHTML)
					// console.log(item.querySelector("div.css-1dbjc4n.r-1ta3fxp.r-18u37iz.r-1wtj0ep.r-1s2bzr4.r-1mdbhws").innerText.split("\n"))
					// console.log(item.querySelector("div.css-1dbjc4n.r-1ta3fxp.r-18u37iz.r-1wtj0ep.r-1s2bzr4.r-1mdbhws").getAttribute("data-label"))
					// const datetime =item.querySelector("a > time").innerText
					// console.log("data in inneerr ",item.querySelector("div.css-1dbjc4n.r-1ta3fxp.r-18u37iz.r-1wtj0ep.r-1s2bzr4.r-1mdbhws").innerText);



					// console.log("scrapper query all ",item.querySelectorAll("div.css-1dbjc4n.r-18u37iz.r-1h0z5md"));
					// console.log("scrapper query all inner ",item.querySelectorAll("div.css-1dbjc4n.r-18u37iz.r-1h0z5md").innerText);
					const hits =item.querySelector("div.css-1dbjc4n.r-1ta3fxp.r-18u37iz.r-1wtj0ep.r-1s2bzr4.r-1mdbhws").innerText.split("\n")
					const image =item.querySelector("img.css-9pa8cd").getAttribute("src")
					// console.log("image===>> ",image)
					results.push({
						date:item.querySelector("a > time").innerText,
						description:item.querySelector("div.css-901oao.r-18jsvk2.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0").innerText,
						description_html:item.querySelector("div.css-901oao.r-18jsvk2.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0").innerHTML,
						comments:hits[0],
						retweet:hits[1],
						likes:hits[2],
						image:image
					});
					post_count+=1;
					if(post_count==2){
						break
					}
				}
				catch{

				}
			
			}
			return results;
		});
		// page.close();
		// let urls = await page.$$eval('#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div > div > div:nth-child(2) > div > div > section > div > div > div', links => {
		// 	console.log("links===========>> ",links.textContent)
		// 	// Make sure the book to be scraped is in stock
		// 	// links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock")
		// 	// Extract the links from the data
		// 	// links = links.map(el => el.querySelector('h3 > a').href)
		// 	return links;
		// });
		// console.log(urls_);
		return urls_;
		
	}
}

module.exports = scraperObject;