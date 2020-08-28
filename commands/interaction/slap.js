module.exports = {
	name: 'slap',
    description: 'Bofetear.',
    aliases: ['bofetear', 'bofetada'],
    guildOnly: true,
	execute(message, args) {
        const { Gif } = require('../../utils/tenor')
        let mencion = message.mentions.users.first()

        if(mencion) Gif(message, "slap anime", `${message.author.username} bofeteó a ${mencion.username}`)
	},
};