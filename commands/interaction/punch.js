module.exports = {
	name: 'punch',
    description: 'Golpear.',
    aliases: ['golpear'],
    guildOnly: true,
	execute(message, args) {
        const { Gif } = require('../../utils/tenor')
        let mencion = message.mentions.users.first()

        if(mencion) Gif(message, "punch anime", `${message.author.username} golpeó a ${mencion.username}`)
	},
};