module.exports = {
	name: 'hug',
    description: 'Abrazar.',
    aliases: ['abrazar', 'abrazo'],
    guildOnly: true,
	execute(message, args) {
        const { Gif } = require('../../utils/tenor')
        let mencion = message.mentions.users.first()

        if(mencion) Gif(message, "hug anime", `${message.author.username} abraza fuerte a ${mencion.username}`)
	},
};