require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const session = require("express-session");
const massive = require("massive");

const adc = require("./controllers/adminController");
const auc = require("./controllers/authController");
const oc = require("./controllers/orderController");
const authCheck = require("./middleware/authCheck");

const str = require("./utils/stripe");

const { SERVER_PORT, SECRET_SESSION, CONNECTION_STRING } = process.env;

const app = express();
app.use(express.json());
app.use(
  session({
    secret: SECRET_SESSION,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 10
    }
  })
);

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("database connected");
  })
  .catch(err => console.log(err));

//ENDPOINTS!//

//AUTH
app.post("/auth/login", auc.login);
app.post("/auth/register", auc.register);
app.delete("/auth/logout", auc.logout);
app.get("/auth/user", auc.getUser);

//ADMIN
app.get("/api/admin/orders", authCheck, adc.getOrders);

//ORDERS
//CART
app.post("/api/addProductToCart", oc.addProductToCart);
// app.put("/api/edit", oc.edit);
app.delete("/api/delete", oc.deleteOrder);
app.post("/api/checkout", oc.checkOut);

//STRIPE
app.get("/api/products", oc.getOrders);
app.get("/api/products/:id", oc.getProduct);
app.get("/api/skus/:id", oc.getSkusByProduct);

//STRIPE CHECKOUT//
app.post("/api/payment", oc.pay);

app.listen(SERVER_PORT, () => console.log(`welcome to port ${SERVER_PORT}`));
