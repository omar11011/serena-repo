module.exports = {
	name: 'kiss',
    description: 'Besar.',
    aliases: ['besar', 'beso'],
    guildOnly: true,
	execute(message, args) {
        const { Gif } = require('../../utils/tenor')
        let mencion = message.mentions.users.first()

        if(mencion) Gif(message, "kiss anime", `${message.author.username} le robó un beso a ${mencion.username}`)
	},
};