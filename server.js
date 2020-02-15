const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const userRoutes = require('./routes/user');

// app.use((req, res) => {
//     res.json({
//         msg: "서버시작"
//     });
// });


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/product', productsRoutes);
app.use('/order', ordersRoutes);
app.use('/user', userRoutes);






const port = 2020;

app.listen(port, () => console.log("server started"));
