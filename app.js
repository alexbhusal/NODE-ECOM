const express = require('express');
const app = express();
const expressHbs = require('express-handlebars');
const helper = require('./helper');
const session = require('express-session');
const mySQLStore = require("express-mysql-session")(session);
const config = require("./connection/db_config");
const flash = require("connect-flash");
const checkadmin = require("./middleware/checkadmin")

const sessionStore = new mySQLStore(config);
const port = 5600;


const adminRoutes = require("./routes/index");

const userRoutes = require("./routes/userindex");

const categoryRoutes = require("./routes/category");

const productRoutes = require("./routes/product");

const loginRoutes = require("./routes/login");

const signupRoutes = require("./routes/signup");

const logoutRoutes = require("./routes/logout");

const cartRoutes = require("./routes/cart");

const orderRoutes = require("./routes/order");



const hbs = expressHbs.create({
    extname:'.hbs',
    defaultLayout:'main.hbs',
    layoutsDir:"views/layouts/",
    partialsDir:"views/partials",
    helpers:helper
});


app.engine('hbs',hbs.engine);
app.set('view engine','hbs');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store:sessionStore
}));

app.use(flash());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/static", express.static(__dirname + "/public"));


app.use('/admin',checkadmin,adminRoutes);

app.use("/admin/category", categoryRoutes);

app.use("/admin/product", productRoutes);

app.use("/login", loginRoutes);

app.use("/signup", signupRoutes);

app.use("/logout",logoutRoutes);

app.use("/cart", cartRoutes);

app.use("/order", orderRoutes);

// user ko routes
app.use('/',userRoutes);


app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
    });