const http = require("http");
const express = require("express");
const app = express();
const prisma = require('./utils/PrismaInstance')

app.post("/", function (req, res) {
	res.send('ok');
});

http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"));
