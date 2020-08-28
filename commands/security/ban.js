module.exports = {
	name: 'ban',
    description: 'Banear.',
    aliases: ['banear'],
    guildOnly: true,
	execute(message, args) {
        if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply('no tienes los permisos necesarios.')
        if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('No tengo los permisos necesarios.')
        
        let user = message.mentions.users.first()
        let razon = args.slice(1).join(' ')

        if (message.mentions.users.size < 1) return message.reply('debes mencionar a alguien.').catch(console.error)
        if(!razon) return message.reply('el uso de este comando es: ``' + process.env.PREFIX + 'ban [@user] [razón]``')
        if (!message.guild.member(user).bannable) return message.reply('No puedo banear a este usuario.')

        message.guild.member(user).ban(razon)
        message.channel.send(`:white_check_mark: El usuario **${user.tag}** ha sido baneado del servidor.`)
	},
};