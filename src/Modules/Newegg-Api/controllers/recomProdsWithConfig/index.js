const getRecomProductsWithConfig = require("../../services/webBot/getRecomProductsWithConfig")
const {getProductsDto} = require("../../utils/getClearDto")
const {setProdsDb} = require("../../utils/setOrUpdateDb")

async function recomProdsController(req,res) {
    const recomProds = await getRecomProductsWithConfig("Monitor Mouse Pad");
    const clearProds = await getProductsDto(recomProds)
    setProdsDb(clearProds,"")
    res.json(clearProds);
}

module.exports = recomProdsController;