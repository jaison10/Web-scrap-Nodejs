const Nightmare = require('nightmare');
const cheerio = require('cheerio');
const request=require('request');
 
const nightmare = Nightmare({show:false})   //showing steps

const url='https://www.flipkart.com';

let search_item= 'gifts';
let title=null;
let link=null;
let price=  null;
let url2=null;
let size= null;

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

            //for boxed items like gifts, dress, etc
             title= $(elem).find('a._2cLu-l').text();
             link= $(elem).find('img._1Nyybr').attr('src');
             price= $(elem).find('div._1vC4OE').text().substring();
            url2 = url+$(elem).find('a._1Vfi6u').attr('href');
             
            // nightmare.goto(url2).wait('body')
            //         .evaluate(()=> document.querySelector('body').innerHTML)
            //         .end()
            //         .then(res=>{
            //             console.log("I'm here!");
            //             console.log(getData2(res));
            //         }).catch(err=>{
            //             console.log(err);
            //         });

            //         let getData2=html=>{
            //             console.log("inside getdata2 function");

            //             const $ = cheerio.load(html);
            //             $('div._1HmYoV._35HD7C:nth-child(2) div.bhgxx2.col-12-12').each((row, raw_elem2)=>{
            //                 $(raw_elem2).find('div div div').each((i, elem2)=>{
            //                     size= $(elem2).find(div._2h52bo).text();

            //                 });
            //             });
            //         }



            // if(url2){
            //     nightmare
            //         .goto(url2)
            //         .wait('body')
            //         .evaluate(()=> document.querySelector('body').innerHTML)                             //i donno why this isnt working
            //         .end()
            //         .then(res=>{
            //             console.log("I'm here!");
            //             console.log(cheerio.load(res).html());
            //         }).catch(err=>{
            //             console.log(err);
            //         });
            // }

            if(url2){
                request(url2,(err,res,html)=>{
                    if(!err && res.statusCode==200){                                              //try with nightmare if that doesnt work uncomment these lines and check
                        const $ = cheerio.load(html);                                            // i removed console.log from first nightmare so the name title isnt getting printed
                        //console.log($.html());                      //u get the whole page for each product

                        // $('div._1HmYoV._35HD7C:nth-child(2) div.bhgxx2.col-12-12').each((row, raw_elem2)=>{
                        //         $(raw_elem2).find('div div div').each((i, elem2)=>{
                        //         size= $(elem2).find('div._2h52bo').text();
                
                        //     });
                        // });
                        star= $('div._1i0wk8').text();
                        // console.log("Avg star is",star); // displays value
                        
                        if(star){
                            data.push({star: star});   // doesnt work.
                        }
                    }
                })
            }
            console.log("Avg star is",star);   // displays null

             if(title){
                data.push({
                    title: title,
                    // link: link,
                    price:price,
                    // newlink:url2,
                    // star:star
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



