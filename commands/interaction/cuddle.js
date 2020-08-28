module.exports = {
	name: 'cuddle',
    description: 'Acurrucarse.',
    aliases: ['acurrucar', 'acurrucarse'],
    guildOnly: true,
	execute(message, args) {
        const { Gif } = require('../../utils/tenor')
        let mencion = message.mentions.users.first()

        if(mencion) Gif(message, "cuddle anime", `${message.author.username} se acurruca en ${mencion.username}`)
	},
};