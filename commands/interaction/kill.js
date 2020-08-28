module.exports = {
	name: 'kill',
    description: 'Matar.',
    aliases: ['matar'],
    guildOnly: true,
	execute(message, args) {
        const { Gif } = require('../../utils/tenor')
        let mencion = message.mentions.users.first()

        if(mencion) Gif(message, "kill anime", `${message.author.username} mató a ${mencion.username}`)
	},
};