module.exports = {
	name: 'bite',
    description: 'Morder.',
    aliases: ['morder'],
    guildOnly: true,
	execute(message, args) {
        const { Gif } = require('../../utils/tenor')
        let mencion = message.mentions.users.first()

        if(mencion) Gif(message, "bite anime", `${message.author.username} ha mordido a ${mencion.username}`)
	},
};