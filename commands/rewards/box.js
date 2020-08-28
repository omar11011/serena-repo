module.exports = {
    name: 'box',
    description: 'Cajas',
    aliases: ['box'],
    guildOnly: true,
    async execute(message, args, client) {
        const Trainers = require('../../../../models/Trainers')
        const Items = require('../../../../models/Items')

        const { DataItem } = require('../../controllers/dataItem')
        const { EmbedColor } = require('../../utils/embedcolor')

        const trainer = await Trainers.findOne({ where: { User: message.author.id }, attributes: ['Box'] })
        if(!trainer) return

        if(!args[0]) {
            EmbedColor(message, message.author.tag, message.author.avatarURL(), '', `Boxes available to open: ${trainer.Box} ${DataItem('Box', 'Emoji')}\n\nTo open a box just use: **${process.env.PREFIX}box open**\nYou can gift a box to a friend using: **${process.env.PREFIX}box give @user**`)
        } else {
            let option = args[0].toLowerCase()

            if(option === "give") {
                let quantity = 1
                if(args[1] && !isNaN(args[2])) quantity = parseInt(args[2])
                if(trainer.Box < quantity) return message.reply(`you do not have boxes available to give away.`)

                const mencion = message.mentions.users.first()

                if(!mencion) return message.reply(`you must mention someone.`)
                if(mencion.bot) return
                if(mencion.id === message.author.id) return message.reply(`if you are going to give yourself boxes better open them with the command **${process.env.PREFIX}box open**`)

                const filter = await Trainers.findOne({ where: { User: mencion.id }, attributes: ['Box'] })
                if(!filter) return message.reply(`the user you are trying to give a box to has not yet registered as a pokémon trainer.`)
                
                await Trainers.update({ Box: trainer.Box - quantity }, { where: { User: message.author.id } })
                await Trainers.update({ Box: filter.Box + quantity }, { where: { User: mencion.id } })

                EmbedColor(message, message.author.tag, message.author.avatarURL(), '', `**${mencion.tag}** has received **(X${quantity}) box** ${DataItem('Box', 'Emoji')} as a gift from you!`)

                client.channels.cache.get(`743153335174955059`).send(`The user ${message.author.tag} used the command box give to ${mencion.tag} and give ${quantity} Box.`)
            } else if(option === "open") {
                if(trainer.Box <= 0) return message.reply(`you do not have boxes available to open.`)

                const stone = require('../../data/items/stone')
                const mega = require('../../data/items/mega')
                const evolve = require('../../data/items/evolveItems')
                const exchange = require('../../data/items/exchange')

                let prizes = [].concat(stone, mega, evolve, exchange)
                let prize = prizes[Math.floor(Math.random() * prizes.length)]

                console.log(prize)

                const filter = await Items.findOne({ where: { User: message.author.id, Item: prize }, attributes: ['Quantity'] })

                await Trainers.update({ Box: trainer.Box - 1 }, { where: { User: message.author.id } })

                if(!filter) await Items.create({ User: message.author.id, Item: prize, Quantity: 1 })
                else await Items.update({ Quantity: filter.Quantity + 1 }, { where: { User: message.author.id, Item: prize } })

                EmbedColor(message, message.author.tag, message.author.avatarURL(), '', `Congratulations! You got **${prize}** ${DataItem(prize, 'Emoji')}`)
            }
        }
    },
};
