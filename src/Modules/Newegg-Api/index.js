const express = require('express');
const router = express.Router();

//Controllers
//const getCategories = require("./services/getCategories")
const searchProductsController = require('./controllers/searchProducts');
const getRecomProdsController = require("./controllers/recomProds")
const getRecomProdsWithConfigController = require("./controllers/recomProdsWithConfig");
const getProdInfoController = require('./controllers/getProductInfo');

/*router.get('/categories', async (req, res) => {
    const categories = await getCategories();    
    res.json(categories);
  })*/
  router.get('/recomProds', async (req, res) => {
    getRecomProdsController(req, res);
  })
  router.get('/recomProdsWithConfig', async (req, res) => {
    getRecomProdsWithConfigController(req, res);
  })
  router.post("/search", async (req, res) => {
    searchProductsController(req, res);
  });
  
  router.post("/getProdInfo",async (req,res)=>{
       await getProdInfoController(req,res);
  });

  module.exports = router;