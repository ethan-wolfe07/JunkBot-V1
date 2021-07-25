module.exports = (client) => {
    client.on('clickButton', async (button) => {
        await button.defer()
        if (button.id === 'discord') {
            
        } else if (button.id === 'invite') {
            
        }
    });
}