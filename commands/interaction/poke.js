module.exports = {
	name: 'poke',
    description: 'Molestar.',
    aliases: ['molestar'],
    guildOnly: true,
	execute(message, args) {
        const { Gif } = require('../../utils/tenor')
        let mencion = message.mentions.users.first()

        if(mencion) Gif(message, "poke anime", `${message.author.username} molesta un poco a ${mencion.username}`)
	},
};