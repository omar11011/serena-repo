module.exports = {
	name: 'run',
    description: 'Correr.',
    aliases: ['correr'],
    guildOnly: true,
	execute(message, args) {
        const { Gif } = require('../../utils/tenor')
        Gif(message, "run anime", `${message.author.username} empezó a correr`)
	},
};