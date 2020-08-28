module.exports = {
	name: 'dance',
    description: 'Bailar.',
    aliases: ['bailar'],
    guildOnly: true,
	execute(message, args) {
        const { Gif } = require('../../utils/tenor')
        Gif(message, "dance anime", `${message.author.username} empezó a bailar`)
	},
};