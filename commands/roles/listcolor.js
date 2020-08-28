module.exports = {
	name: 'listcolor',
    description: 'Listar los roles de colores.',
    aliases: ['listcolors'],
    guildOnly: true,
	async execute(message, args) {
        const Colors = require('../../data/color')
        const { Embed } = require('../../utils/embed')

        let limit = 20
        let page = 1
        let pages = Math.ceil(Colors.length / limit)
        let sobra = Colors.length % limit

        if(!args[0] || isNaN(args[0])) page = 1
        else page = args[0]

        if(page > pages) return

        let start = limit * (page - 1) + 1
        let end = limit * page

        if(page === pages) end = start + sobra - 1

        let list = `If you are a server administrator you can add the following roles:\n\n`
        for(let i = start - 1; i < end; i++) {
            list += `• **${Colors[i][0]}**: ` + '``' + process.env.PREFIX + `addcolor ${i + 1}` + '``\n'
        }

        Embed(message, `Available roles`, `${list}\nTo see the added roles on this server use ${process.env.PREFIX}servercolor`, '', `Showing ${start}-${end} of ${Colors.length} colors.`)
    }
};