import { Injectable } from '@nestjs/common';
import { ProductModel } from 'src/Models/ProductModel';
import cheerio from 'cheerio'
import { SearchRequestDto } from 'src/Models/Dto/SearchRequestDto';
import { SearchResponseDto } from 'src/Models/Dto/SearchResponseDto';

@Injectable()
export class AmazonApiService {
    async searchProducts(input: SearchRequestDto): Promise<SearchResponseDto> {
        try {
            let res = new SearchResponseDto();
            res.products = new Array<ProductModel>();
            const result = await fetch(`https://www.amazon.com/s?k=${input.keywords}&page=${input.page}`, {
                "headers": {
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                    "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
                    "cache-control": "max-age=0",
                    "device-memory": "8",
                    "downlink": "3.7",
                    "dpr": "1",
                    "ect": "4g",
                    "rtt": "150",
                    "sec-ch-device-memory": "8",
                    "sec-ch-dpr": "1",
                    "sec-ch-ua": "\"Microsoft Edge\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-ch-ua-platform-version": "\"15.0.0\"",
                    "sec-ch-viewport-width": "1872",
                    "sec-fetch-dest": "document",
                    "sec-fetch-mode": "navigate",
                    "sec-fetch-site": "same-origin",
                    "sec-fetch-user": "?1",
                    "upgrade-insecure-requests": "1",
                    "viewport-width": "1872",
                    "Cookie": `session-id=138-8562784-5930337; ubid-main=135-9047885-5451147; session-token="5BI+HVxzMxUD7jT5W6PWB3v54s+mHVKj3O9xs1+NLkSoh/DE5LfeExZH4SHNHL+6lN7SzSOfDPmm/8GP97otdNNPsxscTs6KI0oJ+bMmQZua1C8QK8D6bfXWCtXerBYMT6SUorh9PExeR8tGAX8TKLRNaMdLiOJN9HRGeig1tKgfAbzEfEM9Q7nHT7PogSCx7ImDdKmzzMyhLX9OM2Sq9oSJi2katWP0Y+TjPJX2UuROUOJpECgOpckwEYfMjcezVWhpaVNq41hjIy4kFk2BFSW12mUsoAQK30i4c8eJ/772CNyMNhgvOVdR8B9T6zBS1QTGYiwQVmJBHPhb2Bc+1BFOMbqiJPJ+rsvHZ82pS5F0xvUTSXBTLQ=="; x-main=VdTVpThyeFmlAY2wHdjRE81KYXE999hU0IFn2jvfQoOdDBK6IUENjfxp8LqkKwLh; at-main=Atza|IwEBIEmz4QxC0e-2gnuQ9jWd9NEex5pI8dA0oJtJqH6ZLN4g2EY8YmtiqCF35af4LZYJZpskqfbDbLVB8qlae38XjUvR71bKQgv4Zwj3-JO1dPTWOzPH2YXxiV2v9KsM76S7UiHx6O0CWljtZ3WldzyKNgDTlOVXYvEZ6-yiNV1VCGdmGgIngoZIAleDTvYFVzd_I8LQfzwuEVnLavlbb8S7ykk_V2IWjcVUPHiw9ivloFT7Ig; sess-at-main="iBCIo3S4IdhbhOn6NMGeUAhNvQVVJPrncsS7bEwkoUI="; sst-main=Sst1|PQF76rjAMN01Ix4OvoJ9CGXaCU04oReQ81RrlV_U-_7IE4TnFALKBwhnC_q2O_p6V3SPd_dJ8Srej-i5w06eD6_Cs6Pa-NtJ7w-DGOkorPPQvMwCKTD45eGEOUWql3ZzGym-7C5noEaoRQBawVNVzaQCJdiqeoXVq1vzci-_PO4K-sKph_ZiZVGRw8MSaLJPT5RNLL-JYCmaTmWEQuTeuh7BqPTYCK-9_jgoClYVJ5lsyAIOQWy2bAkMJ7rWlm5O-8pipEZEOxARypyw3VP4WylpkjH2gFJf2LF9YFZitaTHob8; lc-main=en_US; session-id-time=2082787201l; i18n-prefs=USD; csm-hit=tb:s-1EVZDQ11B50KHRBDQ5Z2|1695696563844&t:1695696565148&adb:adblk_no`
                },
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": null,
                "method": "GET",
                "mode": "cors",
                "credentials": "include"
            })
            const data = await result.text()
            const $ = cheerio.load(data);
            const section = await $("div.sg-col-20-of-24.s-result-item.s-asin.sg-col-0-of-12.sg-col-16-of-20");
console.log("Esto esta ok")
            section.each((idx, el) => {
                const sku = $(el).attr("data-asin");
                const name = $(el).find("h2").text();
                const img = $(el).find(".s-image").attr("src");
                const price = $(el).find("span.a-offscreen").first().text();
                const clearPrice = Number.parseFloat(price.replace("$", ""));
                const starts = $(el).find(".a-size-base.puis-normal-weight-text").text();
                const product = new ProductModel();
                product.sku = sku;
                product.name = name;
                product.price = clearPrice;
                product.link = "https://www.amazon.com/dp/" + sku;
                product.imgUrl = img;
                res.products.push(product)
            })
            console.log("aqui")
            return res;
        } catch (error) {
            console.log(error)
            return null;
        }
    }

}
