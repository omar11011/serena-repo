module.exports = {
	name: 'jump',
    description: 'Saltar.',
    aliases: ['saltar'],
    guildOnly: true,
	execute(message, args) {
        const { Gif } = require('../../utils/tenor')
        Gif(message, "jump anime", `${message.author.username} empezó a saltar`)
	},
};