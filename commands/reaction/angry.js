module.exports = {
	name: 'angry',
    description: 'Enojarse.',
    aliases: ['angry'],
    guildOnly: true,
	execute(message, args) {
        const { Gif } = require('../../utils/tenor')
        Gif(message, "angry anime", `${message.author.username} se ha enojado`)
	},
};