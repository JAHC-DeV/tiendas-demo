const { getProductInfo } = require("../../services/webBot/webBot")
const { getProductDto } = require("../../utils/getClearDto")
const {setProdDb} = require("../../utils/setOrUpdateDb")

async function getProdInfoController(req, res) {
    const { id } = req.body;
    const resData = await getProductInfo(id);
    if (resData == undefined || resData == null) {
        res.status(404).json({status: false, data:[{msg:"Error al buscar, el producto no existe"}]})
    }else{
        const clearData = await getProductDto(resData.ItemInfo);        
        setProdDb(clearData)
        res.json(clearData);
    }    
}
module.exports = getProdInfoController;