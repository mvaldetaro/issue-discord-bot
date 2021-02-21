const Discord = require("discord.js");
const client = require("./client");

// Cria um client do discord (é o bot em si)
const message = new Discord.Message(client);

module.exports = client;
