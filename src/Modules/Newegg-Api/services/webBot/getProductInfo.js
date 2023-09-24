async function getProductInfo(sku) {
    try {        
        res = await fetch(`https://www.newegg.com/product/api/ProductRealtime?ItemNumber=${sku}`);
        dataJson = await res.json();
        if (dataJson.MainItem == null) {
            return undefined;
        }
        return { ItemInfo: dataJson.MainItem }
    } catch (error) {
        return undefined;
    }
}
module.exports = getProductInfo;