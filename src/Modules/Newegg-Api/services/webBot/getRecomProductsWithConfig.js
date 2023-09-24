
async function getRecomProductsWithConfig(keywords) {
    try {
        const result = await fetch(`https://www.newegg.com/api/RecommendationWithConfig?settingposition=bottom&mode=page&sponsored=true&product=true&campaign=false&article=false&subcategory=false&combo=false&viewitems=&keywords=${keywords}&existingitemlist=1FT-000M-003A1%2C20-313-310%2C9SIACCUBXU7296%2C19-113-786%2C9SIAUSRHJ88878%2C9SIAE4NJSE9468%2C34-156-173%2C24-025-915%2C34-360-287%2C9SIB2A3HDA2919%2C9SIB2A3HD97974%2C9SIB2A3GMM0195%2C9SIABU5E5E6302%2C20-331-073%2C9SIBN6WJXU1452%2C9SIB2BJG047884%2C9SIAJ09G9U0438&isproductionversion=true&isMixResult=true`, {
            "headers": {
              "accept": "application/json, text/plain, */*",
              "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
              "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Microsoft Edge\";v=\"116\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "x-page-alias": "Home",
              "cookie": "NVTC=248326808.0001.0af6e34da.1693974685.1693974685.1693974685.1; NID=9D34340M8O6I4M1j9D; osano_consentmanager_uuid=4362a62c-87aa-469c-a396-0cff6d2fafc5; osano_consentmanager=NjnFu98oXe-284Yf19nrFSbK1ZlTDcZaPyEUseSM_rW6C6ikvBybDimUGQQbo4UCaFjdcRh0FgHTEm0t6NdfMm42vNs3RugJmViIGfiIYbywXHv5Ht8DpRhCmcWn-otqVG-6Uap8MtUAErFa3p2xzewoFZd1comjS9Htj67sCZV7BqucihwdRr6WRnc-EMVXo6tfQzY6O3H1k8dvTl6OGgZzoYkZZd-LlLrZvF2WYoIlIzrFvijnxlnnx8msESQadE1OaG2drOr7kttKeQ1Y9SUMRzNVEDsM09YD-w==; _gcl_au=1.1.376399455.1693974690; NV%5FW57=USA; NV%5FW62=en; NV%5FGAPREVIOUSPAGENAME=homepage; _gid=GA1.2.2074633410.1693974693; cmp_choice=none; cebs=1; _ce.s=v~2477d8d3ade495ce7599ecade9864f89e2009ed1~lcw~1693974694980~vpv~0~lcw~1693974694985; _ce.clock_event=1; _ce.clock_data=3613%2C152.206.139.26%2C1%2Cbfe2a3e18e0f6a479f0326615c34bc23; __gads=ID=e6c9655961f181bc:T=1693974692:RT=1693974692:S=ALNI_MarPf8uaSArZFtt0OE-kEAczkhtFQ; __gpi=UID=000009fc78c9fd8f:T=1693974692:RT=1693974692:S=ALNI_MZwJqJUlVElBmJnO4Jh3MrQYqyAGQ; NV%5FCONFIGURATION=#5%7B%22Sites%22%3A%7B%22USA%22%3A%7B%22Values%22%3A%7B%22w58%22%3A%22USD%22%7D%2C%22Exp%22%3A%222557974930%22%7D%7D%7D; NE_STC_V1=30dfa3db1489abbc0b16b6201d118940b033217c7a83788cccb71f01963fbce3fd85584b; _ga=GA1.2.940597727.1693974692; _gat=1; cebsp_=2; _uetsid=42d7dc504c6e11eeaec44ddccdb0b507; _uetvid=42d98f304c6e11ee9cdb67129e31fb13; xyz_cr_100393_et_137==NaN&cr=100393&wegc=&et=137&ap=; NV_NVTCTIMESTAMP=1693974934; _ga_TR46GG8HLR=GS1.1.1693974692.1.1.1693974937.0.0.0",
              "Referer": "https://www.newegg.com/",
              "Referrer-Policy": "unsafe-url"
            },
            "body": null,
            "method": "GET"
          });
        const data = await result.json();
        const recomProducts = data.Modules[0].RecommendItems;
        //console.log(data.Modules[0].RecommendItems);
       return recomProducts
    } catch (error) {
        return {error:true,msg:error}
    } 
}

module.exports = getRecomProductsWithConfig;