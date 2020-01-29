const express = require('express');

const server = express();

server.use(express.json());


server.get('/teste', (req, res) => {
    res.json({status: "ok"});
});

server.listen(3000);
