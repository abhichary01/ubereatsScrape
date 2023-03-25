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
  const url = 'https://www.ubereats.com/store/poke-n-roll/ouUzo8JaQTqTVqOdJ71OuA'

  await page.goto(url);

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Type into search box
  //await page.type('search-suggestions-typeahead-input', 'bollywood bites');

  // Wait and click on first result
  // const searchResultSelector = "ak hi al bb";
  // await page.waitForSelector(searchResultSelector);
  // await page.click(searchResultSelector);

  // // Locate the full title with a unique string
  // const textSelector = await page.waitForSelector(
  //   'text/Customize and automate'
  // );
  // const fullTitle = await textSelector.evaluate(el => el.textContent);

  // const extractedText = await page.$eval('.gq gr gs gt gu gv gw gx gd', el=>{
  //   const name = el.querySelector('.i1 f8 i2 bo bp cy en b1')
  //   console.log("list 2=>", name);
  // })
  // console.log("heeere",extractedText)
  // let first_column_text = await page.evaluate(()=>{
  //   const close = document.querySelector('.da.aq.bc.e4.l6.l7.l8.l9.la.lb.lc.ld.dm.j7.h5.le.lf.kj.lg.cq.lh.li.lj.k1.lk.k2.ei.bo.bp.cy.en.ll.lm.ln.lo.kf.kh.ke.kg.b1.b0.lp.lq.d1.in');
  //   if(close){
  //     close.click();
  //   }
  // });
  // await page.screenshot({path: `eeeeeeeeeeee.jpeg`})
  // const elementHandle = await page.$('button[data-baseweb="button"]');
  // if(elementHandle){
  //   await elementHandle.click();
  // }

  // await page.waitForSelector('button.al.ag.iz.kc.jh.jg.bi.bj.bf.h4.af.da.d9.kd'); // wait for the button to appear
  // const closeButton = await page.$('button.al.ag.iz.kc.jh.jg.bi.bj.bf.h4.af.da.d9.kd'); // select the button element
  // if (closeButton) {
  //   await closeButton.click(); // click the button
  // } else {
  //   console.log('Button not found.');
  // }
  await page.screenshot({ path: path.join(__dirname, '../src/img/eeeeeee.jpeg') })
  const closeButton = await page.$('button[aria-label="Close"]');
  if (closeButton) {
    await closeButton.click();
  }
  await page.screenshot({ path: path.join(__dirname, '../src/img/xxxxxxxxxxxxx.jpeg') })
  // await page.waitForSelector("span.i1.f8.i2.bo.cx.bq.en.b1");
  //var prodName = await page.evaluate(() => Array.from(document.querySelectorAll('span.i1.f8.i2.bo.cx.bq.en.b1'), element => element.textContent));
  await page.screenshot({ path: path.join(__dirname, '../src/img/tttttttttttttt.jpeg') })
  // await page.waitForSelector('span.i1.f8.i2.bo.cx.bq.en.b1')
  // let element = await page.$('span.i1.f8.i2.bo.cx.bq.en.b1')
  // let value = await page.evaluate(el => el.textContent, element)
  // console.log("ggggggggggg",value)
  // const extractedText = await page.$eval('div > span.i1.f8.i2.bo.bp.cy.en.b1', (el) => el.innerText);
  // console.log("vvvvvvv",extractedText);
  // var prodPrice = await page.evaluate(() => Array.from(document.querySelectorAll('span.i1.f8.i2.bo.cx.bq.en.b1'), element => element.textContent));
  // console.log("xxxxxxxxxxxxx",prodPrice)
  var prodImage = [];
  // const alllnks = await page.evaluate(() => {
  //   const items = document.querySelectorAll('ul');
  //   console.log("alll links", items)
  //   return Array.from(items).map(item=>{
  //     const link = item.querySelector('a');
  //     return link.getAttribute('href')
  //   })
  // });
  // const links4 = await page.$$eval('a',(links)=>{
  //   return links.map((link)=>link.href)
  // })
  // const links5 = await page.$$eval('div > div > div > div > div > div',(links)=>{
  //   return links.map((link)=>link.getAttribute('href'))
  // })
  // const links1 = await page.$$eval('meta',(links)=>{
  //   return links.map((link)=>link.getAttribute('content'))
  // })
  const realurls = [];
  const childLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'));
    const childLinks: any = links.filter(link => link.href.startsWith('https://www.ubereats.com/store/poke-n-roll'));
    let allLinks: any = childLinks.map(link => link.href);
    return allLinks;
  });
  var allLinks = childLinks;
  // childLinks.forEach((elem)=>{
  // const url = new URL(elem);
  // const queryParams = new URLSearchParams(url.search);
  // console.log("ppppppppppppp",queryParams);
  // const storeUuid = elem.get("modctx").match(/"storeUuid":"([\w-]+)"/)[1];
  // const itemUuid = elem.get("modctx").match(/"itemUuid":"([\w-]+)"/)[1];
  // const path = `/store/poke-n-roll/ouUzo8JaQTqTVqOdJ71OuA/${storeUuid}/${elem.get("sectionUuid")}/${elem.get("subsectionUuid")}/${itemUuid}`;
  // const realUrl = `https://www.ubereats.com${path}`;
  // realurls.push(realUrl)

  // if (matches && matches.length >= 4) {
  //   const storeUuid = JSON.parse(decodeURIComponent(matches[3])).storeUuid;
  //   const sectionUuid = JSON.parse(decodeURIComponent(matches[3])).sectionUuid;
  //   const subsectionUuid = JSON.parse(decodeURIComponent(matches[3])).subsectionUuid;
  //   const itemUuid = JSON.parse(decodeURIComponent(matches[3])).itemUuid;
  //   const validLink = `${matches[1]}/${storeUuid}/${sectionUuid}/${subsectionUuid}/${itemUuid}`;
  //   console.log("heeere",validLink);
  //   return validLink;
  // }
  //   const regex = /(.*)\?(.*)modctx=(.*)\&ps=1/;
  // const matches = regex.exec(elem);
  // if (matches && matches.length >= 4) {
  //   const decoded = decodeURIComponent(matches[3].replace(/\+/g, ' ')); // Decode the URL-encoded string and replace "+" with spaces
  //   const json = JSON.parse(decoded); // Parse the JSON string
  //   const storeUuid = json.storeUuid;
  //   const sectionUuid = json.sectionUuid;
  //   const subsectionUuid = json.subsectionUuid;
  //   const itemUuid = json.itemUuid;
  //   const validLink = `${matches[1]}/${storeUuid}/${sectionUuid}/${subsectionUuid}/${itemUuid}`;

  //   console.log("heeere",validLink);
  //   return validLink;
  //   }
  // })
  // console.log(second_part)
  // console.log(third_part)
  // console.log(output)
  // console.log("heeere->",parsedURLs)
  // const links2 = await page.$$eval('div > picture > img',(links)=>{
  //   return links.map((link)=>link.getAttribute('src'))
  // })

  // const imglinks = await page.$$eval('.lazyload-wrapper',(links)=>{
  //   return links.map((link)=>link.getAttribute('src'))
  // })

  // Scroll to the bottom of the page with puppeteer-autoscroll-down
  // await scrollToEndOfPageNew(page);

  // async function scrollToEndOfPage(page) {
  //   await page.evaluate(async () => {
  //     await new Promise<void>((resolve) => {
  //       const distance = 1000;
  //       const scrollInterval = setInterval(() => {
  //         const scrollHeight = document.body.scrollHeight;
  //         window.scrollBy(0, distance);
  //         const newScrollHeight = document.body.scrollHeight;
  //         if (newScrollHeight !== scrollHeight) {
  //           // If the scroll height has changed, we have not yet reached the bottom of the page
  //           // Reset the timeout
  //           clearTimeout(timeout);
  //           timeout = setTimeout(() => {
  //             clearInterval(scrollInterval);
  //             resolve();
  //           }, 1000);
  //         }
  //       }, 500);
  //       let timeout = setTimeout(() => {
  //         clearInterval(scrollInterval);
  //         resolve();
  //       }, 10000);
  //     });
  //   });
  // }
  // async function scrollToEndOfPageNew(page) {
  //   await page.evaluate(() => {
  //     return new Promise((resolve) => {
  //       const distance = 2500;
  //       let prevHeight = document.body.scrollHeight;
  //       const scrollInterval = setInterval(() => {
  //         window.scrollBy(0, distance);
  //         const newHeight = document.body.scrollHeight;
  //         if (newHeight === prevHeight) {
  //           clearInterval(scrollInterval);
  //           resolve('Reached end of page.');
  //         } else {
  //           prevHeight = newHeight;
  //         }
  //       }, 1200);
  //     });
  //   });
  //   // await page.waitForTimeout(500);
  // }
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



  // await page.waitForSelector('img', { visible: true, timeout: 10000 });
  // const links3 = await page.$$eval('img[aria-hidden="true"]', imgs => imgs.map(img => img.src));

  // for (let i=0; i<links3.length;i++){
  //   //await page.screenshot({path: path.join(__dirname,`../src/img/picture${i}.jpeg`)})
  //   const imgSrc = await page.$$eval('img[aria-hidden="true"]', (links)=>{
  //     if (links.map((link)=>link.hasAttribute('src'))) {
  //       return links.map((link)=>link.getAttribute('src'));
  //     }
  //     // return links.map((link)=>link.getAttribute('src'))
  //   })
  //   // console.log("images",imgSrc)
  // }

  // await page.waitForSelector('img',{visible: true});
  // await page.waitForSelector('img',{visible: true, timeout: 90000});
  // await page.waitForNavigation();
  // await page.waitForNetworkIdle();
  // const imageSrcs = await page.evaluate(() => {
  //   const images = Array.from(document.getElementsByTagName('img'));
  //   return images.map(img => img.src);
  // });
  // console.log("linksss",links3)
  // console.log("linksss1",links1)
  // console.log("linksss2",links2)
  // console.log("linksss3",links3)


  // console.log("SSSSS links", links1)

  // const extractedText = await page.$$eval('*', (el: any)=>el.innerText)
  // console.log("list 2=>", mapping);
  // Print the full title
  // console.log('The title of this blog post is "%s".', fullTitle);
  try{
    for (let i = 0; i < 10; i++) {
      try{
        const [baseURL, query] = allLinks[i].split("?");
      // let k = allLinks[i].findIndex(checkURL);
      // function checkURL(url) {
      //   return url === 'https://www.ubereats.com/store/poke-n-roll/ouUzo8JaQTqTVqOdJ71OuA?diningMode=PICKUP&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%2522a2e533a3-c25a-413a-9356-a39d27bd4eb8%2522%252C%2522sectionUuid%2522%253A%2522676d3ba4-5f48-4051-8b4c-16d13476cd50%2522%252C%2522subsectionUuid%2522%253A%25227e12b8f3-f5f4-5196-856e-0443c5fb19e7%2522%252C%2522itemUuid%2522%253A%25228c1e0f31-564b-4ee9-a088-a5d94c0923c7%2522%257D&ps=1&sc=SEARCH_SUGGESTION';
      // }
      // console.log("baseurl->",baseURL)
      // console.log("query->",query)
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
      // console.log("link=>", `${baseURL}/${firstId}/${secondId}/${thirdId}`)
  
      if (firstId && secondId && thirdId) {
        await page.goto(`${baseURL}/${firstId}/${secondId}/${thirdId}`);
        // const links3 = await page.$eval('img[role="presentation"]', img => img.src);

        const addons = await page.evaluate(() => Array.from(document.querySelectorAll('div.al.aq'), element => element.textContent));
        // await page.waitForSelector('h1.go.gp.bm.bk.al.bc', { timeout: 2500 });
        // const menuName = await page.$eval('h1.go.gp.bm.bk.al.bc', el => el.textContent.trim());
        // const extractedText = await page.$eval('h1.go.gp.bm.bk.al.bc', (el) => el.innerText);
        // inside my e2e test file
        const spanVal = await page.evaluate(() => Array.from(document.querySelectorAll('div.qo'), element => element.textContent));
        console.log("heeere",spanVal)
        const filteredAddons = addons.slice(4);
        // const imgSrc = await page.$$eval('img[aria-hidden="true"]', (links)=>{
        //   if (links.map((link)=>link.hasAttribute('src'))) {
        //     return links.map((link)=>link.getAttribute('src'));
        //   }
        //   // return links.map((link)=>link.getAttribute('src'))
        // })
        // Add the Stealth plugin to PuppeteerExtra
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
                // return links.map((link)=>link.getAttribute('src'))
              })
              prodImage.push(links3)
              // console.log("here", links3)
              console.log("images",prodImage)
        } catch (error) {
          prodImage.push("Not Available");
          console.error('Timeout waiting for element.',error);
        }
        // Continue executing other code...
        // if (!await page.waitForSelector('img[role="presentation"]')) {
        //   console.log("not found")
        // } else {
        //   const links3 = await page.$eval('img[role="presentation"]', (link) => {
        //     if (link.hasAttribute('src')) {
        //       console.log("Passs", link.getAttribute('src'));
        //       return link.getAttribute('src')
        //       // linkss.push(link.getAttribute('src'))
        //     } else {
        //       console.log("Image not found")
        //       return null
        //     }
        //     // return links.map((link)=>link.getAttribute('src'))
        //   })
        //   console.log("here", links3)
        // }
        //   const prodPrice = await page.evaluate(() => Array.from(document.querySelectorAll('span.i1.f8.i2.bo.cx.bq.en.b1'), element => element.textContent));
        //   const mapping = prodName.map((val, i) => {
        //   return { "productName": val, "price": prodPrice[i] }
        // })
        // console.log("adddons",filteredAddons)
      }
      }catch(error){
        console.log("second scope",error)
        prodImage.push("Not Available");
      }  
    }
  }catch(error){
    console.log("invalid link")
    prodImage.push("Not Available");
  }
  // var mapping = prodName.map((val: any, i: string | number) => {
  //   return { "productName": val, "price": prodPrice[i] }
  // })
  // console.log("llllllllllll",prodImage.length,prodName.length,prodPrice.length)
  // console.log("final",mapping)
  await browser.close();

};
data();