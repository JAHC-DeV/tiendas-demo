import { Injectable } from '@nestjs/common';
import { SearchRequestDto } from 'src/Models/Dto/SearchRequestDto';
import { ProductModel } from 'src/Models/ProductModel';
import cheerio from 'cheerio'
import { SearchResponseDto } from 'src/Models/Dto/SearchResponseDto';
import { HttpResponseWrapper } from 'src/Models/HttpResponseWrapper';

@Injectable()
export class NeweggApiService {

    async getRecomProducts<T>(): Promise<HttpResponseWrapper<T>> {
        let result;
        try {
            result = await fetch("https://ec-apis.newegg.com/api/adapterex/Jpf/page?access_token=7jkHJ5AnrYurScqHBunHm7dbajcJes91O4mKohx8&CountryCode=USA&CompanyCode=1003&LanguageCode=en-us", {
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
            const prods = await ProductModel.GetArrayModel(data.Modules[0].RecommendItems);
            const response = new HttpResponseWrapper<T>();
            response.Content = prods as T;
            response.Error = false;
            response.StatusCode = result.status;
            return response;
        } catch (error) {

            const response = new HttpResponseWrapper<T>();
            response.Content = null;
            response.Error = true;
            response.StatusCode = 500;
            return response;
        }
    }
    async getRecomProductsWithConfig<T>(keywords: string): Promise<HttpResponseWrapper<T>> {
        let result;
        try {
            result = await fetch(`https://www.newegg.com/api/RecommendationWithConfig?settingposition=bottom&mode=page&sponsored=true&product=true&campaign=false&article=false&subcategory=false&combo=false&viewitems=&keywords=${keywords}&existingitemlist=1FT-000M-003A1%2C20-313-310%2C9SIACCUBXU7296%2C19-113-786%2C9SIAUSRHJ88878%2C9SIAE4NJSE9468%2C34-156-173%2C24-025-915%2C34-360-287%2C9SIB2A3HDA2919%2C9SIB2A3HD97974%2C9SIB2A3GMM0195%2C9SIABU5E5E6302%2C20-331-073%2C9SIBN6WJXU1452%2C9SIB2BJG047884%2C9SIAJ09G9U0438&isproductionversion=true&isMixResult=true`, {
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
            const prods = await ProductModel.GetArrayModel(data.Modules[0].RecommendItems);
            const response = new HttpResponseWrapper<T>();
            response.Content = prods as T;
            response.Error = false;
            response.StatusCode = result.status;
            return response;
        } catch (error) {
            const response = new HttpResponseWrapper<T>();
            response.Content = null;
            response.Error = true;
            response.StatusCode = 500;
            return response;
        }
    }

    async getProductInfo(sku): Promise<ProductModel> {
        try {
            const res = await fetch(`https://www.newegg.com/product/api/ProductRealtime?ItemNumber=${sku}`);
            const dataJson = await res.json();
            if (dataJson.MainItem == null) {
                return undefined;
            }
            return ProductModel.GetModel(dataJson.MainItem);
        } catch (error) {
            return undefined;
        }
    }

    async searchProductsController(data: SearchRequestDto): Promise<SearchResponseDto> {
        let res = new SearchResponseDto();
        res.products = new Array<ProductModel>();
        console.log(data.page)
        const rawData = await fetch("https://www.newegg.com/p/pl?d=" + data.keywords + "&page=" + data.page, {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
                "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Microsoft Edge\";v=\"116\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
                "cookie": "NV_MC_FC=Natural|www.bing.com; NV_MC_LC=Natural|www.bing.com; osano_consentmanager_uuid=3bba25ab-d4b2-4a93-888c-c7cd632d1ff0; osano_consentmanager=U-zKMqmbOuduFsRCWaZiuvOCgBaGzJKK0LaLJxOfuaQFzv7xvoI2uoTmCISKR3dLXApT4K20aimuICgjZqtECfbikoNRUWhMjwHCcubWqNUALmyfmKVzXehv95VTOro0sot7JfSe4hXvz4n-_y6JOmce3WHXph72i2fSje7fJ-h9YE7DZZRJwSCYxMKWEuPPfTWX6ITieWxSAYy7gSrRhfxcUw7OX8C4J0kZPSbLm8BFEzX5toW1xoAvaWtMrtuN5vytRci3y56iPAdAv90Zf9l7m14Np-wE9NusyQ==; NV%5FW57=USA; NV%5FW62=en; _gcl_au=1.1.160400365.1693454758; xyz_cr_100393_et_137==NaN&cr=100393&wegc=&et=137&ap=; _tt_enable_cookie=1; _ttp=vvUe0atkHKgfsy4MlUfI4g8NkSh; __gsas=ID=7dabd9ade7d524bf:T=1693461620:RT=1693461620:S=ALNI_Ma1VPtXgDEzeO3lVmssHDE3UlLTPg; NV_TID_LC=6676; NV_ECM_TK_LC=%7B%22icid%22%3A%7B%7D%2C%22cm_sp%22%3A%7B%22value%22%3A%22SP-_-2022763-_-0-_-6-_-9SIAGDFJYT6874-_-16gb%20ram%20ddr4-_-ddr4-_-1%22%2C%22expiretime%22%3A1696177294314%7D%2C%22cm_mmc%22%3A%7B%7D%7D; _gid=GA1.2.210482181.1693688039; cmp_choice=none; cebs=1; _ce.s=v~edbfa40585347b790efc1c490b0c51d03b73438e~lcw~1693583720501~vpv~3~lcw~1693688048553; __gads=ID=c62e23ab7f0f0666:T=1693460410:RT=1693688046:S=ALNI_MaLvtsTbqo_oX_7KxXnfXP6kie7Hg; __gpi=UID=00000c6b9dd9156f:T=1693460410:RT=1693688046:S=ALNI_MYdwZQ_Joo0CT2G03IGS32-ZHORIQ; _ce.clock_event=1; _ce.clock_data=2883%2C185.183.34.167%2C1%2C3818c388c9250e9d322146783bafeb30; cf_clearance=6T3sAYDfvMYUTEV78BUB8TGe5iVe9MGKBepfwwzDeL4-1693688198-0-1-5cf32a3f.c59c5ab.bf275df-0.2.1693688198; NV%5FCONFIGURATION=#5%7B%22Sites%22%3A%7B%22USA%22%3A%7B%22Values%22%3A%7B%22w58%22%3A%22USD%22%2C%22wd%22%3A1%2C%22w39%22%3A6676%7D%2C%22Exp%22%3A%222557688212%22%7D%7D%7D; NV%5FGAPREVIOUSPAGENAME=product%20details; _ga=GA1.2.548989849.1693454764; _uetsid=dc822dc049d211ee9f90854e1f66a635; _uetvid=c0aaf47047b311eeaa34d9210579eb41; tracker_device=a136da55-6c80-43a3-a663-9057e0dc1aa7; cebsp_=2; syf-widget-token=ed35ff3f-1084-466c-bbe7-910f2f62c4cb; NVTC=248326808.0001.fee2df820.1693454728.1693689837.1693691637.12; NID=0M348O2Q34349D720M02dc1aed7cce4373f21d0d0024091b948; _ga_TR46GG8HLR=GS1.1.1693691785.7.0.1693691785.0.0.0; NV_NVTCTIMESTAMP=1693691784; NE_STC_V1=30dfa3db5506f033d80a4b6734857fc3a197dab9f5f7b8bb87c13e990884d90305b147ea",
                "Referer": "https://www.newegg.com/",
                "Referrer-Policy": "unsafe-url"
            },
            "body": null,
            "method": "GET"
        });
        const response = await rawData.text();
        const $ = cheerio.load(response);
        //const items= $(".item-cells-wrap");   
        const items = $(".item-cell");
        const list_tool_pagination = $(".list-tool-pagination");
        const buttons_gruop = $(list_tool_pagination[1]).children(".btn-group").children()
        const maxPagesElement = $(buttons_gruop[buttons_gruop.length - 2]).text()
        res.maxPages = Number.parseInt(maxPagesElement);
        let categoryElement = $(".left-nav-subcategory-title");
        res.category = categoryElement.text().replaceAll(" ", "");
        console.log(items.length)
        items.each((idx, el) => {
            const product = new ProductModel();
            const info = $(el).find("a").first();
            const price = $(el).find(".price-current");
            product.link = info.attr("href");
            product.imgUrl = info.children().attr("src");
            product.name = info.children().attr("title");
            product.price = Number.parseFloat(price.find("strong").first().text() + price.find("sup").first().text());
            //  product.price = product.price.replace(",", "");
            product.sku = $(el).children("div").attr("id");
            if (product.sku != null && product.price != null && product.price != 0 && product.name != null && product.name != "") {
                res.products.push(product);
            } else {
                //console.log("saltado", product)
            }
        })
        return res;
    }
}