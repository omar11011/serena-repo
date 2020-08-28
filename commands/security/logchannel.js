module.exports = {
	name: 'logchannel',
    description: 'Redirecciona el canal de los registros del servidor.',
    aliases: ['logchannel'],
    guildOnly: true,
	async execute(message, args, client) {
        const Guilds = require('../../../../models/Guilds')

        if(!message.member.hasPermission('ADMINISTRATOR')) return
        if(!args[0] && args[0].length < 20) return

        let idChannel = args[0].slice(2, -1).toString()
        let channel = client.channels.cache.get(idChannel)
        
        try {
            channel.send(':white_check_mark: Redireccionamiento exitoso!')
            await Guilds.update({ Log: idChannel }, { where: { Guild: message.guild.id } })
        } catch (e) {
            console.log(e)
        }
	},
};