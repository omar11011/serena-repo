module.exports = {
	name: 'relcolor',
    description: 'Eliminar un rol de color.',
    aliases: ['deletecolor'],
    guildOnly: true,
	async execute(message, args) {
        const Guilds = require('../../../../models/Guilds')

        if(!message.member.hasPermission('ADMINISTRATOR')) return 
        if(!args[0] || isNaN(args[0])) return
        if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send('No tengo los permisos necesarios.')

        const guild = await Guilds.findOne({ where: { Guild: message.guild.id }, attributes: ['Colors'] })

        if(!guild) {
            await Guilds.create({ Guild: message.guild.id })

            if(role) {
                try {
                    role.delete()
                } catch(error) {
                    console.log(error)
                }
            }

            return message.reply(`This role does not exist on the server.`)
        } else {
            let num = parseInt(args[0])
            let colors = []
            let colorColumn = guild.Colors

            if(colorColumn) colors = colorColumn.split(",")
            if(num > colors.length) return

            let name = colors[num - 1]
            let role = message.guild.roles.cache.find(r => r.name === name)

            if(colors.includes(name)) {
                try {
                    role.delete()

                    let position = colors.indexOf(name)
                    colors.splice(position, 1)
                    
                    await Guilds.update({ Colors: colors.join(",") }, { where: { Guild: message.guild.id } })

                    return message.reply(`The **${name}** role has been removed from the server.`)
                } catch(error) {
                    message.reply(`an error occurred while trying to delete this role.`)
                }
            } else return message.reply(`This role does not exist on the server.`)
        }
	},
};