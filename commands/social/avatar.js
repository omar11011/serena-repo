module.exports = {
	name: 'avatar',
    description: 'Mira el avatar de un usuario.',
    aliases: ['foto'],
    guildOnly: true,
	execute(message, args) {
        const { EmbedColor } = require('../../utils/embedcolor')

        const mencion = message.mentions.users.first()

        if(mencion) EmbedColor(message, `Avatar de ${mencion.tag}`, message.author.avatarURL(), mencion.displayAvatarURL())
        else EmbedColor(message, `Avatar de ${message.author.tag}`, message.author.avatarURL(), message.author.displayAvatarURL())
	},
};