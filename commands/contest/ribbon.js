module.exports = {
    name: 'ribbon',
    description: 'Cintas de concurso pokémon.',
    aliases: ['ribbons', 'cintas'],
    guildOnly: true,
    async execute(message, args) {
        const Trainers = require('../../../../models/Trainers')
        const Ribbons = require('../../../../models/Ribbons')

        const { EmbedColor } = require('../../utils/embedcolor')
        const { DataItem } = require('../../controllers/dataItem')
        const module = require('../../data/contest/ribbons')

        const trainer = await Trainers.findOne({ where: { User: message.author.id }, attributes: ['ID'] })
        if (!trainer) return

        const ribbon = await Ribbons.findAll({ where: { User: message.author.id }, attributes: ['Ribbon'] })

        let result = []
        if (ribbon) {
            for (let i = 0; i < ribbon.length; i++) {
                console.log(ribbon[i]);
                result.push(ribbon[i].Ribbon)
            }
        } else {
            console.log('empty')
        }

        let list = []
        for (let i = 0; i < module.length; i++) {
            let name = module[i]
            let num = result.filter(r => r === name).length
            list.push(`• ${name}: x${num} ${DataItem(name, 'Emoji')}`)
        }

        let description = `These are the tapes you have managed to get so far:\n\n${list.join("\n")}`

        EmbedColor(message, '', '', '', description)
    },
};