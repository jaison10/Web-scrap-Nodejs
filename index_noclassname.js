getData = function(html){
    data=[];
    name = String;
    pr = "";
    haha=0;
    const $ = cheerio.load(html);
    $('div._1HmYoV._35HD7C:nth-child(2) div.bhgxx2.col-12-12').each((row,row_elem)=>{
        $(row_elem).find('div div div').each((i,elem)=>{
            $(elem).find('a').each((j,a_elem)=>{
                insidePrice =0;
                name = $(a_elem).attr('title');       //finds title for all the boxed items
                if($(a_elem).children()){
                    $(a_elem).find('div div').each((k,price)=>{
                        if(k==0) {
                            if($(price).text().substring(1).length>0){
                                console.log($(price).text().substring(1).length);
                                pr = $(price).text().substring(1);
                                console.log("pr variable :"+pr);
                                console.log($(price).parent().html());
                                console.log($(price).html());
                                console.log("insidePrice"+insidePrice);
                                haha++;
                            }
                            pr=""
                        }
                    });
                }
                if(name){
                    console.log(name);
                }
                // if(name && pr.length>0 && present(name,...data)){
                // // if(name){
                //     data.push({
                //         title: name,
                //         price: pr
                //     });
                // }
            });
        });
    });
    console.log("ITENS FOUND :"+haha);
    return data;
}

present = function(){
    d=[]
    k=arguments[0]
    for(i=1;i<arguments.length;i++)
        d.push(arguments[i])
    for(i=0;i<d.length;i++){
        j=0;
        while(j<k.length){
            if(k[j]==d[i]['title'][j]){}
            else
                break;
            j+=1;
        }
        if(j==k.length)
            return false;
    }
    return true;
}