module.exports = {
	name: 'rolecolor',
    description: 'Elige un rol de color.',
    aliases: ['rolecolor'],
    guildOnly: true,
	async execute(message, args) {
        const Guilds = require('../../../../models/Guilds')

        const guild = await Guilds.findOne({ where: { Guild: message.guild.id }, attributes: ['Colors'] })

        const embed = (color, rol, num) => {
            const embed = new MessageEmbed()
                .setColor(color)
                .setTitle(`Role created!`)
                .setDescription(`:white_check_mark: You got the **${rol}** role.`)
                // .setFooter(`To remove this role use ${process.env.PREFIX}quitrole ${num}`, '')
            message.channel.send(embed)
        }

        if(!guild) {
            await Guilds.create({ Guild: message.guild.id })
            return message.reply(`this server does not yet have roles available to its users.`)
        } else {
            if(!guild.Colors) return message.reply(`this server does not yet have roles available to its users.`)
            if(!args[0] || isNaN(args[0])) return

            let colors = []
            let num = parseInt(args[0])
            let position = num - 1
            let colorColumn = guild.Colors

            if(colorColumn) colors = colorColumn.split(",")
            if(num > colors.length) return

            let role = message.guild.roles.cache.find(r => r.name === colors[position])

            if(!role) return message.reply(`the role you are trying to obtain no longer exists on the server, ask an administrator to re-create it.`)
            if(message.member.roles.cache.has(role.id)) return message.reply(`you already have this role in your profile.`)

            message.member.roles.add(role.id)
            return message.reply(`You have received the role **${colors[position]}**. That's great!`)
        }
	},
};