const server = require("./server.js");
const Commands = require("./commands.js");

const commands = new Commands();

commands.init();

server.listen(3000);

console.log("Issue Bot iniciado.");
