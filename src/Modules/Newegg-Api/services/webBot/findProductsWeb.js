const cheerio = require("cheerio")
async function Search(params, page) {
  const res = {
    products: [],
    maxPages: 0,
    currentPage: page,
    category: ""
  }
  const rawData = await fetch("https://www.newegg.com/p/pl?d=" + params + "&page=" + page, {
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
  const data = await rawData.text();
  const $ = cheerio.load(data);
  //const items= $(".item-cells-wrap");   
  const items = $(".item-cell");
  const list_tool_pagination = $(".list-tool-pagination");
  const buttons_gruop = $(list_tool_pagination[1]).children(".btn-group").children()
  const maxPages = $(buttons_gruop[buttons_gruop.length - 2]).text()
  res.maxPages = maxPages;
  let category = $(".left-nav-subcategory-title");
  category = category.text().replaceAll(" ", "");
  res.category = category;
  items.each((idx, el) => {
    const product = {
      sku: "",
      name: "",
      link: "",
      imgUrl: "",
      price: "",
      category: ""
    }
    const info = $(el).find("a").first();
    const price = $(el).find(".price-current");
    product.link = info.attr("href");

    product.imgUrl = info.children().attr("src");
    product.name = info.children().attr("title");
    product.price = price.find("strong").first().text() + price.find("sup").first().text();
    product.price = product.price.replace(",", "");
    const sku = $(el).children("div").attr("id");
    product.sku = sku;

    if (validator(product.sku, product.name, product.price)) {
      res.products.push(product);
      product.category = category;
    }
  })

  return res;
}
const validator = ( sku, name, price) => {

  if (sku == undefined || sku == "" || price == undefined || price == "" || name == undefined || name == "") {
    return false
  }

  return true;
}
module.exports = Search;


