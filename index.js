/* Importing dependencies */
const { Client, Collection } = require('discord.js');
const { config } = require('dotenv');

/* Set up the config for .env to work */
config();

/* Initiating a new bot client */
const bot = new Client({});

/* Creating a new collection for commands + aliases */
bot.commands = new Collection();
bot.aliases = new Collection();

['commands', 'aliases'].forEach((collection) => {
	bot[collection] = new Collection();
});

/* For the load-commands and load-events file, pass the bot variable so it can be used in the files */
['load-commands', 'load-events'].forEach((handlerFile) => require(`./handlers/${handlerFile}.js`)(bot));

/* Logging into the bot with a Discord token */
bot.login(process.env.DISCORD_TOKEN);


const disbut = require('discord-buttons')(client);
const buttonEvent = require('./events/bot/buttonEvent')

client.on('ready', async r => {
    console.log(`${client.user.username} is now ready!`)
    buttonEvent(client)

    client.user.setPresence({
    status: 'idle',
    activity: {
        'name': 'Junkyard members',
        'type': 'WATCHING'
        }
    })
})

client.login(process.env.TOKEN)