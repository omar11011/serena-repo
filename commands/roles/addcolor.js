module.exports = {
	name: 'addcolor',
    description: 'Agregar un rol de color a tu servidor.',
    aliases: ['addcolor'],
    guildOnly: true,
	async execute(message, args) {
        const { MessageEmbed } = require('discord.js')
        const Guilds = require('../../../../models/Guilds')

        const Colors = require('../../data/color')

        if(!message.member.hasPermission('MANAGE_ROLES')) return 
        if(!args[0] || isNaN(args[0]) || args[0] > Colors.length) return
        if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send('No tengo los permisos necesarios.')

        const guild = await Guilds.findOne({ where: { Guild: message.guild.id }, attributes: ['Colors'] })

        const embed = (color, rol, num) => {
            const embed = new MessageEmbed()
                .setColor(color)
                .setTitle(`Role created!`)
                .setDescription(`:white_check_mark: The **${rol}** role has been created on this server.`)
                .setFooter(`To remove this role use ${process.env.PREFIX}relcolor ${num}`, '')
            message.channel.send(embed)
        }

        let colors = []
        let name = Colors[args[0] - 1][0]
        let color = Colors[args[0] - 1][1]
        let role = message.guild.roles.cache.find(r => r.name === name)

        if(!guild) {
            try {
                await Guilds.create({ Guild: message.guild.id })

                setTimeout(async () => {
                    if(!role) {
                        try {
                            message.guild.roles.create({ data: { name: `${name}`, color: `${color}`, permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL'] } })
                        } catch (error) {
                            console.log(error)
                        }
                    }

                    try {
                        colors.push(name)
                        await Guilds.update({ Colors: colors.join(",") }, { where: { Guild: message.guild.id } })
                        embed(color, name, args[0])
                        
                    } catch(error) {
                        message.reply(`there was an error trying to create the role.`)
                    }
                }, 3000)
            } catch(error) {
                console.log(error)
            }
        } else {
            let colorColumn = guild.Colors

            if(colorColumn) colors = colorColumn.split(",")

            if(colors.includes(name)) {
                if(!role) {
                    try {
                        message.guild.roles.create({ data: { name: `${name}`, color: `${color}`, permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL'] } })
                    } catch (error) {
                        message.reply(`there was an error trying to create the role.`)
                    }
                }
                return message.reply(`this role has been recreated on the server.`)
            } else {
                try {
                    colors.push(name)
                    await Guilds.update({ Colors: colors.join(",") }, { where: { Guild: message.guild.id } })
                    message.guild.roles.create({ data: { name: `${name}`, color: `${color}`, permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL'] } })
                    embed(color, name, args[0])
                    
                } catch(error) {
                    message.reply(`there was an error trying to create the role.`)
                }
            }
        }
    }
};