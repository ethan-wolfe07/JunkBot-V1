module.exports = (bot) => {
    bot.on('ready', async r => {
        console.log(`${bot.user.username} is now ready!`)
    
        bot.user.setPresence({
        status: 'idle',
        activity: {
            'name': 'Junkyard members',
            'type': 'WATCHING'
            }
        })
    })
}