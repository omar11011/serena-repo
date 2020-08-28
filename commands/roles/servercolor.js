module.exports = {
	name: 'servercolor',
    description: 'Mira los roles de colores disponibles en tu servidor.',
    aliases: ['servercolor'],
    guildOnly: true,
	async execute(message, args) {
        const Guilds = require('../../../../models/Guilds')

        const { Embed } = require('../../utils/embed')

        const guild = await Guilds.findOne({ where: { Guild: message.guild.id }, attributes: ['Colors'] })

        if(!guild) {
            await Guilds.create({ Guild: message.guild.id })
            return message.reply(`this server does not yet have roles available to its users.`)
        } else {
            if(!guild.Colors) return message.reply(`this server does not yet have roles available to its users.`)
            else {
                let list = ''
                let page = 1
                let limit = 10
                let colorColumn = guild.Colors
                let colors = colorColumn.split(",")
                let quantity = colors.length
                let pages = Math.ceil(quantity / limit)
                let sobra = quantity % limit
                let start = limit * (page - 1) + 1
                let end = limit * page

                if(args[0] && !isNaN(args[0])) page = parseInt(args[0])
                if(page == pages) end = start + sobra - 1

                for(let i = start - 1; i < end; i++) {
                    list += `• **${colors[i]}**: ` + '``' + process.env.PREFIX +'rolecolor ' + `${i + 1}` + '``\n'
                }

                Embed(message, `Roles available on this server`, `${list}`, '', `Showing ${start}-${end} of ${quantity} available colors.`)
            }
        }
	},
};