module.exports = {
	name: 'lick',
    description: 'Lamer.',
    aliases: ['lamer'],
    guildOnly: true,
	execute(message, args) {
        const { Gif } = require('../../utils/tenor')
        let mencion = message.mentions.users.first()

        if(mencion) Gif(message, "lick anime", `${message.author.username} lame suavemente a ${mencion.username}`)
	},
};