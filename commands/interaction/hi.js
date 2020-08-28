module.exports = {
	name: 'hi',
    description: 'Saludar.',
    aliases: ['hola'],
    guildOnly: true,
	execute(message, args) {
        const { Gif } = require('../../utils/tenor')
        let mencion = message.mentions.users.first()

        if(mencion) Gif(message, "anime hi", `${message.author.username} saludó a ${mencion.username}`)
        else Gif(message, "hi anime", `${message.author.username} saludó a todo el mundo`)
	},
};