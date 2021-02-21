const client = require("./client");
const open = require("open");
const config = require("./config.json");

//prefix+command arguments
const prefix = "!";
const oauth_url = config.GITHUB.OAUTH_URL;
const clientId = config.GITHUB.CLIENT_ID;

class Commands {
  init = () => {
    client.on("message", function (message) {
      if (message.author.bot) {
        return;
      }

      if (!message.content.startsWith(prefix)) {
        return;
      }

      // Parser do comando
      const commandBody = message.content.slice(prefix.length);
      const args = commandBody.split(" ");
      const command = args.shift().toLowerCase();

      switch (command) {
        case "ping":
          const timeTaken = Date.now() - message.createdTimestamp;
          message.reply(`Pong! Está mensagem teve latência de ${timeTaken}ms.`);
          break;

        case "auth":
          message.reply(`Bora logar!`);
          (async () => {
            await open(`${oauth_url}/authorize?client_id=${clientId}`);
          })();
          break;
        default:
          break;
      }
    });

    client.login(config.BOT_TOKEN);
  };
}

module.exports = Commands;
