module.exports = async (bot) => {
	console.log(`${bot.user.username} is online!`);
    
    bot.user.setPresence({ activities: [{ name: 'Junkyard Members' }], status: 'idle' })
    console.log('Status Set!');
};