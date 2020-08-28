module.exports = {
	name: 'daily',
    description: 'daily',
    aliases: ['daily'],
    guildOnly: true,
	async execute(message, args) {
        const Trainers = require('../../../../models/Trainers')
        const Items = require('../../../../models/Items')
        const Commands = require('../../../../models/Commands')

        const balls = require('../../data/items/pokeball')
        const { DataItem } =require('../../controllers/dataItem')
        const { TimeAwait } = require('../../utils/timeAwait')

        const trainer = await Trainers.findOne({ where: { User: message.author.id }, attributes: ['ID'] })
        if(!trainer) return

        const command = await Commands.findOne({ where: { User: message.author.id, Command: "daily" }, attributes: ['Date'] })

        let number = 50 + Math.ceil(Math.random() * 70)
        let prize = balls[Math.floor(Math.random() * balls.length)]
        let time = Math.round((new Date()).getTime() / 1000)
        let cd = 43200

        if(["Beast Ball"].includes(prize)) number = Math.ceil(Math.random() * 20)
        if(["Master Ball"].includes(prize)) prize = 'Poke Ball'

        if(command && time - command.Date < cd) return message.reply(TimeAwait(message, cd - (time - command.Date)))

        const item = await Items.findOne({ where: { User: message.author.id, Item: prize }, attributes: ['Quantity'] })
        
        if(!command) await Commands.create({ User: message.author.id, Guild: message.guild.id, Command: 'daily', Date: time })
        else await Commands.update({ Guild: message.guild.id, Date: time }, { where: { User: message.author.id, Command: 'daily' } })

        if(!item) await Items.create({ User: message.author.id, Item: prize, Quantity: number })
        else await Items.update({ Quantity: item.Quantity + number }, { where: { User: message.author.id, Item: prize } })

        return message.reply(`you have received **(X${number}) ${prize}** ${DataItem(prize, 'Emoji')}`)
	},
};