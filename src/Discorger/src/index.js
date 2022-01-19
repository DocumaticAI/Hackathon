require('dotenv').config();

const Acol = require('./Structures/Bot');

const client = new Acol();

client.connect();