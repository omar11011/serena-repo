module.exports = {
	name: 'happy',
    description: 'Feliz.',
    aliases: ['feliz'],
    guildOnly: true,
	execute(message, args) {
        const { Gif } = require('../../utils/tenor')
        Gif(message, "happy anime", `${message.author.username} está muy conetnto`)
	},
};