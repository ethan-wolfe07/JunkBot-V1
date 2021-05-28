const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
require('dotenv').config()

const client = new DiscordJS.Client({
    partials: ['MESSAGE', 'REACTION']
})

client.on('ready', () => {

    new WOKCommands(client, {

        commandsDir: 'Commands',
        featuresDir: 'Features',
        messagesPath: '',
        showWarns: true,

        del: -1,
        
        defaultLangauge: "english",
        ignoreBots: false,
        
        // Various options for your MongoDB database connection
        dbOptions: {
            // These 4 are the default options
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        },
        
        // What server/guild IDs are used for testing only commands & features
        // Can be a single string if there is only 1 ID
        testServers: ['ID1', 'ID2', 'ID3'],
        
        // What built-in commands should be disabled.
        // Note that you can overwrite a command as well by using
        // the same name as the command file name.
        disabledDefaultCommands: [
            'help'
            // 'command',
            // 'language',
            // 'prefix',
            // 'requiredrole'
        ]
    })
        // Here are some additional methods that you can chain
        // onto the contrustor call. These will eventually be
        // merged into the above object, but for now you can
        // use them:
        
        // The default is !
        .setDefaultPrefix('>')
        
        // Used for the color of embeds sent by WOKCommands
        .setColor("#a04b00")
        .setMongoPath(process.env.MONGO_URI)
})

client.login(process.env.TOKEN)