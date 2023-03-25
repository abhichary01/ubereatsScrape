import express from 'express';
import path from 'path';
import  puppeteer from 'puppeteer-extra';
import { PuppeteerExtra } from 'puppeteer-extra';
import Stealthplugin from 'puppeteer-extra-plugin-stealth'
const app = express();
const port = 3000;

puppeteer.use(Stealthplugin())
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
// var prodImage: string[] = [];

const data = async () => {

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const url = 'https://www.ubereats.com/store/poke-n-roll/ouUzo8JaQTqTVqOdJ71OuA?diningMode=PICKUP'


  await page.goto(url);

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  const closeButton = await page.$('button[aria-label="Close"]');
  if (closeButton) {
    await closeButton.click();
  }
  var categories = (await page.evaluate(() => Array.from(document.querySelectorAll('h3'), element => element.innerText))).slice(0,-7);
  var modifiers = (await page.evaluate(() => Array.from(document.querySelectorAll('label'), (element) => element.textContent)))
  var prodImage = [];
  var prodName = [];
  var prodPrice = [];
  var prodDescription = [];
  var prodAddons = [];
  const realurls = [];
  const childLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'));
    const childLinks: any = links.filter(link => link.href.startsWith('https://www.ubereats.com/store'));
    let allLinks: any = childLinks.map(link => link.href);
    return allLinks;
  });
  var allLinks = childLinks;
  
  // async function autoScroll(page){
  //   await page.evaluate(async () => {
  //       await new Promise<void>((resolve) => {
  //           var totalHeight = 0;
  //           var distance = 1000;
  //           var timer = setInterval(() => {
  //               var scrollHeight = document.body.scrollHeight;
  //               window.scrollBy(0, distance);
  //               totalHeight += distance;

  //               if(totalHeight >= scrollHeight - window.innerHeight){
  //                   clearInterval(timer);
  //                   resolve();
  //               }
  //           }, 100);
  //       });
  //   });
  // }
  // Get your image links
  // let imageLinks = await page.$$eval('.list-card img', imgLinks => {
  //   return imgLinks.map((i) => i.src);
  // });

  try{
    for (let i = 0; i < allLinks.length; i++) {
      try{
      const [baseURL, query] = allLinks[i].split("?");
      let output = query.substring(query.indexOf("sectionUuid"))
      let first_part = output.split('subsectionUuid')[0]
      let second_part = 'subsectionUuid' + output.split('subsectionUuid')[1].split('itemUuid')[0]
      let third_part = 'itemUuid' + output.split('itemUuid')[1]
      const matches01 = first_part.split("%");
      const matches02 = second_part.split("%");
      const matches03 = third_part.split("%");
      let firstId = matches01[3].slice(4);
      let secondId = matches02[3].slice(4);
      let thirdId = matches03[3].slice(4);
  
      if (firstId && secondId && thirdId) {
        await page.goto(`${baseURL}/${firstId}/${secondId}/${thirdId}`);
        var addons = await page.evaluate(() => Array.from(document.querySelectorAll('div.al.aq'), element => element.textContent));
        var description = await page.evaluate(() => Array.from(document.querySelectorAll('div.bo'), element => element.textContent));
        await page.waitForSelector('h1', { timeout: 2500 });

        const menuItem = await page.$eval('h1', (node => node.textContent.trim()));
        const menuPrice = await page.$eval('span', (node => node.textContent.trim()));
        var filteredAddons = addons.slice(4,-2);
        try {
          await page.waitForSelector('img[role="presentation"]', { timeout: 2500 });
          const links3 = await page.$eval('img[role="presentation"]', (link) => {
                if (link.hasAttribute('src')) {
                  console.log("Passs", link.getAttribute('src'));
                  return link.getAttribute('src')
                } else {
                  console.log("Image not found")
                  return null
                }
              })
            prodImage.push(links3)
            prodName.push(menuItem)
            prodPrice.push(menuPrice)
            prodAddons.push(filteredAddons)
        } catch (error) {
          console.error('Timeout waiting for element.',error);
        }
      }
      }catch(error){
        console.log("second scope",error)
      }  
    }
  }catch(error){
    console.log("invalid link")
  }
  var mapping = prodName.map((val: any, i: string | number) => {
    return { "productName": val, "price": prodPrice[i], "productImage": prodImage[i], "productAddons": prodAddons[i] }
  })
  console.log("final",mapping)
  await browser.close();

};
data();