module.exports = {
	name: 'kick',
    description: 'Expulsar miembros del servidor.',
    aliases: ['kick'],
    guildOnly: true,
	execute(message, args) {
        let user = message.mentions.users.first()
        let razon = args.slice(1).join(' ')
        
        if(!message.member.hasPermission('KICK_MEMBERS')) return
        if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('No tengo los permisos necesarios.')
        if(!user || !razon) return message.reply('El uso de este comando es: ``' + process.env.PREFIX + 'kick [@user] [razon]``').catch(console.error)
        if(!message.guild.member(user).kickable) return message.reply('No puedo expulsar al usuario mencionado.')
        
        message.guild.member(user).kick(razon)
        message.channel.send(`:white_check_mark: El usuario **${user.tag}** ha sido expulsado del servidor.`)
	},
};