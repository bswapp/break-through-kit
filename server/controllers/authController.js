require("dotenv").config({ path: __dirname + "/../.env" });
const { EMAIL_PASSWORD } = process.env;

const bcrypt = require("bcrypt");
const saltRounds = 12;

("use strict");
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
let testAccount = nodemailer.createTestAccount();

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.mail.outlook.com",
  service: "outlook",
  auth: {
    user: "breakthroughkits@outlook.com", // generated ethereal user
    pass: EMAIL_PASSWORD // generated ethereal password
  },
  tls: {
    rejectedUnauthorized: false
  }
});

module.exports = {
  async login(req, res) {
    const db = req.app.get("db");
    const { username, password } = req.body;
    const exsistingUser = await db.auth.get_user(username);
    if (!exsistingUser[0])
      return res.status(401).send("Username was not found");
    const result = await bcrypt.compareSync(
      password,
      exsistingUser[0].password
    );
    console.log(result);
    if (result) {
      req.session.user = {
        username: exsistingUser[0].username,
        id: exsistingUser[0].id,
        loggedIn: true,
        is_admin: result ? true : false
      };
      res.send(req.session.user);
    } else res.status(401).send("Password or Username Incorrect");

    req.session.cart = [];
  },

  async register(req, res) {
    const db = req.app.get("db");
    const { username, password, email, profile_img, is_admin } = req.body;
    console.log(req.body);
    const returningUser = await db.auth.get_user(username);
    // console.log(returningUser);
    if (returningUser[0])
      return res.status(400).send(`Username already exists`);

    const salt = await bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hashSync(password, salt);
    const user = await db.auth.create_user([
      username,
      hash,
      email,
      profile_img,
      is_admin
    ]);
    console.log(user);

    let info = await transporter
      .sendMail({
        from: "breakthroughkits@outlook.com", // sender address
        to: user[0].email, // list of receivers
        subject: "Welcome!", // Subject line
        text: "hello", // plain text body
        html: "<b>Hello!</b>" // html body
      })
      .catch(err => console.log(err));

    req.session.user = {
      username: user.username,
      password: user.password,
      email: user.email,
      profile_img: user.profile_img,
      is_admin: user.is_admin,
      loggedIn: true
    };

    res.send(req.session.user);
  },

  getUser(req, res) {
    res.send(req.session.user).status(200);
  },

  logout(req, res) {
    req.session.destroy();
    res.sendStatus(200);
  }
};
