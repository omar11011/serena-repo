module.exports = {
	name: 'pat',
    description: 'Dar palmada.',
    aliases: ['palmada'],
    guildOnly: true,
	execute(message, args) {
        const { Gif } = require('../../utils/tenor')
        let mencion = message.mentions.users.first()

        if(mencion) Gif(message, "pat anime", `${message.author.username} le dió una palmada a ${mencion.username}`)
	},
};