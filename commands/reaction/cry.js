module.exports = {
	name: 'cry',
    description: 'Llorar.',
    aliases: ['llorar'],
    guildOnly: true,
	execute(message, args) {
        const { Gif } = require('../../utils/tenor')
        Gif(message, "cry anime", `${message.author.username} empezó a llorar`)
	},
};