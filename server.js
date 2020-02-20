const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const userRoutes = require('./routes/user');



mongoose.connect("mongodb://joke716:k9915402@ds141294.mlab.com:41294/node-rest-shop", { useNewUrlParser: true , useUnifiedTopology:true})
    .then(() => console.log("mongoDB conneted"))
    .catch(err => console.log(err.message));


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/product', productsRoutes);
app.use('/order', ordersRoutes);
app.use('/user', userRoutes);






const port = 2020;

app.listen(port, () => console.log("server started"));
