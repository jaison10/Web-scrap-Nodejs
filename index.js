const Nightmare = require('nightmare');
const cheerio = require('cheerio');
var Scraper = require('image-scraper');

 
const nightmare = Nightmare({show:false})   //showing steps

const url='https://www.flipkart.com/';
var scraper = new Scraper('https://www.flipkart.com/');

// scraper.scrape(function(image) { 
//     image.save();
// });
let search_item= 'paint';

nightmare.goto(url)
.wait('body')
.click('button._2AkmmA._29YdH8')
.type('input.LM6RPg',search_item)  //searching for the item.
.click('button.vh79eN')
.wait('div.bhgxx2')
.evaluate(()=> document.querySelector('body').innerHTML)
.end()
.then(response=>{
    console.log(getData(response));
}).catch(err=>{
    console.log(err);
});

let getData = html=>{
    data=[];
    const $ = cheerio.load(html);
    $('div._1HmYoV._35HD7C:nth-child(2) div.bhgxx2.col-12-12').each((row, raw_elem)=>{
        $(raw_elem).find('div div div').each((i, elem)=>{
            
            let title= $(elem).find('div div a:nth-child(2)').text();
            // let link= $(elem).find('div div a:nth-child(2)').attr('href');
            let link= $(elem).find('img._1Nyybr').attr('src');
            let price= $(elem).find('div._1vC4OE').text().substring();
            if(title){
                data.push({
                    
                    title: title,
                    link: link,
                    price:price
                });
                
            }
        });
    });
    return data;
}



