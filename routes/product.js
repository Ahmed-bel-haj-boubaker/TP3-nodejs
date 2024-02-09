var express = require("express");
var fs = require("fs");

const products = require("../products.json");
var router = express.Router();

router.get("/", (req, res) => {
  fs.readFile("products.json", "utf8", (err, data) => {
    if (err) {
      console.error("Erreur lors de la lecture du fichier :", err);
      res.status(500).send("Erreur interne du serveur");
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      const products = jsonData;

      res.status(200).json({ products: products });
    } catch (err) {
      console.error("Erreur lors du parsing JSON :", err);
      res.status(500).send("Erreur interne du serveur");
    }
  });
});

router.get("/:id", (req, res) => {
  fs.readFile("products.json", "utf8", (err, data) => {
    if (err) {
      console.error("Erreur lors de la lecture du fichier :", err);
      res.status(500).send("Erreur interne du serveur");
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      const products = jsonData;
      const productId = req.params.id;
      console.log(productId);
      if (products.hasOwnProperty(productId)) {
        const product = products[productId];
        res.status(200).json(product);
      } else {
        res.status(404).send("Produit non trouvé");
      }
    } catch (err) {
      console.error("Erreur lors du parsing JSON :", err);
      res.status(500).send("Erreur interne du serdddveur");
    }
  });
});

router.get("/instock/:qt", (req, res) => {
  fs.readFile("products.json", "utf8", (err, data) => {
    if (err) {
      console.error("Erreur lors de la lecture du fichier :", err);
      res.status(500).send("Erreur interne du serveur");
      return;
    }

    try {
      const products = JSON.parse(data);
      const requestedQuantity = parseInt(req.params.qt);
         console.log(requestedQuantity)
      const inStockProducts = Object.keys(products).filter(productId => {
        return products[productId].stock >= requestedQuantity;

      }).map(productId => {
        console.log( products[productId].stock)

        return {
          
          id: productId,
          name: products[productId].name,
          stock: products[productId].stock
        };
      });
      if (inStockProducts.length > 0) {
        res.status(200).json({
          inStockProducts,
        });
      } else {
        res.status(404).send("Produit non trouvé");
      }
    } catch (err) {
      console.error("Erreur lors du parsing JSON :", err);
      res.status(500).send("Erreur interne du serveur");
    }
  });
});

router.get("/:id/:qt", (req, res) => {
  fs.readFile("products.json", "utf8", (err, data) => {
    if (err) {
      console.error("Erreur lors de la lecture du fichier :", err);
      res.status(500).send("Erreur interne du serveur");
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      const products = jsonData;
      const productId = req.params.id;

      console.log(productId);
      if (products.hasOwnProperty(productId)) {
        const product = products[productId];
        const quantity = parseInt(req.params.qt);
        const price = product.price;
        const totalPrice = price * quantity;

        console.log(totalPrice);
        console.log(quantity);
        res.status(200).json({
          id: product.name,
          quantity: quantity,
          totalPrice: totalPrice,
          unitPrice: product.price,
        });
      } else {
        res.status(404).send("Produit non trouvé");
      }
    } catch (err) {
      console.error("Erreur lors du parsing JSON :", err);
      res.status(500).send("Erreur interne du serveur");
    }
  });
});



module.exports = router;
