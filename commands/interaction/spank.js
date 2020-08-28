module.exports = {
	name: 'spank',
    description: 'Nalguear.',
    aliases: ['nalguear'],
    guildOnly: true,
	execute(message, args) {
        const { Gif } = require('../../utils/tenor')
        let mencion = message.mentions.users.first()

        if(mencion) Gif(message, "spank anime", `${message.author.username} nalgueó a ${mencion.username} 7u7`)
	},
};