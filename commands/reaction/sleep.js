module.exports = {
	name: 'sleep',
    description: 'Dormir.',
    aliases: ['dormir'],
    guildOnly: true,
	execute(message, args) {
        const { Gif } = require('../../utils/tenor')
        Gif(message, "sleep anime", `${message.author.username} se echó a dormir una siesta`)
	},
};