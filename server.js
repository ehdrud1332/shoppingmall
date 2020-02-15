const aaa = require('express');
const bbb = aaa();

const port = 2020;

bbb.listen(port, () => console.log("server started"));
