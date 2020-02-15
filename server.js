const express = require('express');
const app = express();
















app.use((req, res) => {
    res.json({
        msg: "서버시작"
    });
});















const port = 2020;

app.listen(port, () => console.log("server started"));
