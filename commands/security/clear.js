module.exports = {
	name: 'clear',
    description: 'Eliminar mensajes.',
    aliases: ['borrar'],
    guildOnly: true,
	execute(message, args) {
        if(!message.member.hasPermission('MANAGE_MESSAGES') || !args[0] || isNaN(args[0]) || args[0] < 1) return 
        if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.reply('no tengo los permisos necesarios para manipular los mensajes.')

        var cantidad = args[0]

        if(cantidad > 50) cantidad = 50

        try {
            message.channel.bulkDelete(cantidad, true).then(() => {
                message.channel.send(`:white_check_mark: Deleted ${cantidad} messages.`).then(msg => msg.delete(3000));
            })
        } catch (e) {
            console.log(e)
        }
	},
};