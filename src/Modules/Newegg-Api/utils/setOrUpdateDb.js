const product = require("../Models/product")

function setProdsDb(products,keywords) {
    const productsPromise = products.map(async item => {
        try {
            if (item.desciption) {
                await product.upsert({
                    name: item.name,
                    sku: item.sku,
                    link: item.link,
                    imgUrl: item.imgUrl,
                    price: item.price,
                    desciption: item.desciption,
                    category: item.category,
                    searchIndex: keywords
                })
            } else {
                await product.upsert({
                    name: item.name,
                    sku: item.sku,
                    link: item.link,
                    imgUrl: item.imgUrl,
                    price: item.price,                   
                    category: item.category,
                    searchIndex: keywords
                })
            }
            
        } catch (error) {
            console.log(error)
        }
    })
    Promise.all(productsPromise).then();    
}
function setProdDb(item) {
    const productsPromise = async ()=>{
        await product.upsert({
            name: item.name,
            sku: item.sku,
            link: item.link,
            imgUrl: item.imgUrl,
            price: item.price,
            desciption: item.desciption,
            category: item.category,           
        })
    }   
    productsPromise()
}
module.exports = {setProdsDb,setProdDb};