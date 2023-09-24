
async function getRecomProducts() {
    try {
        const result = await fetch("https://ec-apis.newegg.com/api/adapterex/Jpf/page?access_token=7jkHJ5AnrYurScqHBunHm7dbajcJes91O4mKohx8&CountryCode=USA&CompanyCode=1003&LanguageCode=en-us", {
            "headers": {
                "accept": "application/json",
                "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
                "access-control-allow-origin": "*",
                "content-type": "application/json",
                "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Microsoft Edge\";v=\"116\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "x-nvtc": "248326808.0001.fee2df820.1693454728",
                "Referer": "https://www.newegg.com/",
                "Referrer-Policy": "unsafe-url"
            },
            "body": "{\"PageInfo\":{\"PageLevel\":79,\"PageId\":2,\"NodeId\":null},\"AcceptType\":{\"Campaign\":true},\"App\":\"Homepage_seller_Recom\",\"IsProductionVersion\":true,\"LanguageCode\":\"en-us\",\"LimitItemCount\":100}",
            "method": "POST"
        })
        const data = await result.json();
        const recomProducts = data.Modules[0].RecommendItems;
        //console.log(data.Modules[0].RecommendItems);
       return recomProducts
    } catch (error) {
        return {error:true,msg:error}
    } 
}

module.exports = getRecomProducts;