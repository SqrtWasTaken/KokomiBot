const Discord = require('discord.js');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const profileSchema = require('./profile-schema');

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGES
    ]
})

client.once('ready', async () => {
    await mongoose.connect(process.env.MONGO_URI, { keepAlive: true })
    console.log('Kokomi is online!');
    client.user.setPresence({ activities: [{ name: 'k$help', type: 'WATCHING' }], status: 'idle' });
    let handler = require('./command-handler');
    if (handler.default) handler = handler.default;

    handler(client);
});

client.login(process.env.TOKEN);