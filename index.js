const Nightmare = require('nightmare');
const cheerio = require('cheerio');

 
const nightmare = Nightmare({show:false})   //showing steps

const url='https://www.flipkart.com/';

let search_item= 'gifts';
let title=null;
let link=null;
let price=  null;

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
            
            // let title= $(elem).find('div div a:nth-child(2)').text();
            // let link= $(elem).find('div div a:nth-child(2)').attr('href');
            
            //for boxed items like gifts, dress, etc
             title= $(elem).find('a._2cLu-l').text();
             link= $(elem).find('img._1Nyybr').attr('src');
             price= $(elem).find('div._1vC4OE').text().substring();
             if(title){
                data.push({
                    
                    title: title,
                    link: link,
                    price:price
                });
                
                

            }
            if(!title){
                 link= $(elem).find('a._31qSD5 img._1Nyybr').attr('src');
                 title= $(elem).find('div._1-2Iqu div div._3wU53n').text();
                 price= $(elem).find('div._1-2Iqu div:nth-child(2) div div div._1vC4OE').text().substring();

                 if(title){
                    data.push({
                        
                        title: title,
                        link: link,
                        price:price
                    });
                    
                }
            }
            //for mobile, samsung etc
            
            
            
            
        });
    });
    return data;
}



