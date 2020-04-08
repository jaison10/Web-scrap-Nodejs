const Nightmare = require('nightmare');
const cheerio = require('cheerio');
var Scraper = require('image-scraper');

 
const nightmare = Nightmare({show:true})   //showing steps

const url='https://www.flipkart.com/';
var scraper = new Scraper('https://www.flipkart.com/');

// scraper.scrape(function(image) { 
//     image.save();
// });


nightmare.goto(url)
.wait('body')
.click('button._2AkmmA._29YdH8')
.type('input.LM6RPg','puma shoes')
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
            // let img= $(elem).find('div img._1Nyybr');
            let title= $(elem).find('div div a:nth-child(2)').text();
            let link= $(elem).find('div div a:nth-child(2)').attr('href');
            let price= $(elem).find('div div div._1vC4OE').text();
            if(title){
                data.push({
                    // img= img,
                    title: title,
                    // link: link,
                    price:price
                });
            }
        });
    });
    return data;
}



