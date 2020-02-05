const stripe = require("../utils/stripe");

module.exports = {
  addProductToCart: (req, res) => {
    // I expect to push a product to the cart array //
    const { productArray } = req.body;
    console.log(productArray);
    req.session.cart = productArray;
    res.status(200).send(productArray);
  },

  editCart() {
    // I expect the user to be able to edit their cart //
  },

  deleteOrder: () => {
    // I expect the user to delete their whole entire order //
  },

  checkOut(req, res) {
    let { line_items } = req.body;
    stripe.checkout.sessions.create(
      {
        success_url: "https://example.com/success",
        cancel_url: "https://example.com/cancel",
        payment_method_types: ["card"],
        line_items
      },
      function(err, session) {
        console.log(err);
        return res.status(201).json(session);
        // asynchronously called
      }
    );
  },

  getOrders(req, res) {
    stripe.products.list({ limit: 3 }, function(err, products) {
      console.log(products, "this is products");
      // asynchronously called
      return res.status(200).json(products);
    });
  },

  getProduct(req, res) {
    let { id } = req.params;
    stripe.products.retrieve(id, function(err, product) {
      return res.status(200).json(product);
      // asynchronously called
    });
  },
  getSkusByProduct(req, res) {
    let { id } = req.params;
    console.log(id);

    stripe.skus.list(
      {
        product: id
      },
      function(err, skus) {
        return res.status(200).json(skus);

        // asynchronously called
      }
    );
  },
  pay: (req, res) => {
    const {
      token: { id },
      amount
    } = req.body;
    console.log(id, amount, stripe);
    stripe.charges.create(
      {
        amount: amount,
        currency: "usd",
        source: id,
        description: "Test Charge"
      },
      (err, charge) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        } else {
          console.log("Successful payment", charge);
          //this is where you would do something with that purchase (i.e. store that information to your db)
          return res.status(200).send(charge);
        }
      }
    );
  }
};
