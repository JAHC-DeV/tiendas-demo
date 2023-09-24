const getRecomProducts = require("../../services/webBot/getRecomProducts")
const {getProductsDto} = require("../../utils/getClearDto")
const {setProdsDb} = require("../../utils/setOrUpdateDb")

async function recomProdsController(req,res) {
    const recomProds = await getRecomProducts();
   // console.log(recomProds);
    const clearProds = await getProductsDto(recomProds);
    setProdsDb(clearProds,"")
    res.json(clearProds);   
}



module.exports = recomProdsController;