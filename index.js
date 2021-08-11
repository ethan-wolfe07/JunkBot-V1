/* Importing dependencies */
const { Client, Collection } = require('discord.js');
const Levels = require('discord-xp')
const noblox = require('noblox.js')
const { config } = require('dotenv');

/* Set up the config for .env to work */
config();

/* Initiating a new bot client */
const bot = new Client({ intents: 32767 });

/* Starting up the Roblox Bot */
async function startApp () {
    
    const currentUser = await noblox.setCookie(process.env.NOBLOX_KEY) 
    console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`)

    const groupInfo = await noblox.getGroup(10186959)
}
    startApp()

/* Setting up the discord-xp module */
Levels.setUrl(process.env.MONGO_URI) // Work in progress (will be pushed on next update)

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