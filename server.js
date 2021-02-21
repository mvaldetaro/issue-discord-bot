const express = require("express");
const client = require("./client");
const config = require("./config.json");
const axios = require("axios");

const server = express();

const clientId = config.GITHUB.CLIENT_ID;
const clientSecret = config.GITHUB.SECRET_ID;
const oauth_url = config.GITHUB.OAUTH_URL;

let token = null;

server.get("/", (req, res) => {
  res.redirect(`${oauth_url}/authorize?client_id=${clientId}`);
});

server.get(`/oauth-callback`, (req, res) => {
  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    code: req.query.code,
  };

  const opts = { headers: { accept: "application/json" } };

  axios
    .post(`${oauth_url}/access_token`, body, opts)
    .then((rRes) => {
      return rRes.data["access_token"];
    })
    .then((_token) => {
      token = _token;
      console.log("Token:", token);
      res.json({ ok: 1 });
      console.log(client);
      client.message("Autorizado com sucesso!");
    })
    .catch((rErr) => {
      return res.status(500).json({ message: rErr.message });
    });
});

console.log("IssueBot Server na porta 3000");

module.exports = server;
