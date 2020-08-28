module.exports = {
	name: 'inventory',
    description: 'Mira tu inventario.',
    aliases: ['inventory'],
    guildOnly: true,
	async execute(message, args) {
        const Items = require('../../../../models/Items')
        const Trainers = require('../../../../models/Trainers')

        const Mint = require('../../data/items/mint')
        const Vitamin = require('../../data/items/vitamin')
        const Pokeball = require('../../data/items/pokeball')
        const EvolveItem = require('../../data/items/evolveItems')
        const Stone = require('../../data/items/stone')
        const Mega = require('../../data/items/mega')

        const { DataItem } = require('../../controllers/dataItem')
        const { Embed } = require('../../utils/embed')

        const items = ["Mints", "Vitamins", "Poke Balls", "Evolve Items", "Evolve Stones", "Mega Stones"]
        const access = ["mints", "vitamins", "balls", "evolve items", "evolve stones", "megas"]
        const modules = [Mint, Vitamin, Pokeball, EvolveItem, Stone, Mega]
        
        let list = ``
        let item = []
        let quantity = []

        const trainer = await Trainers.findOne({ where: { User: message.author.id }, attributes: ['ID'] })
        if(!trainer) return
        
        if(!args[0]) {
            for(let i = 0; i < items.length; i++) {
                list += DataItem('Backpack','Emoji') + ' **' + items[i] + '**: ``' + process.env.PREFIX + 'inventory ' + access[i] + ' [Page]``\n\n'
            }
            Embed(message, 'Your Inventory:', list)
        } else {
            let words = []
            let page = [1]
            for(let i = 0; i < args.length; i++) {
                if(isNaN(args[i])) words.push(args[i].toLowerCase())
                else page = [args[i]]
            }

            if(access.includes(words.join(" "))) {
                page = page[0]
                let position = access.indexOf(words.join(" "))
                let limit = 10
                let pages = Math.ceil(modules[position].length / limit)
                let sobra = modules[position].length % limit
                let start = limit * (page - 1)
                let end = limit * page
                let extra = `To switch to the next page use **${process.env.PREFIX}inventory ${words.join(" ")} ${parseInt(page) + 1}**`

                if(page == pages) {
                    extra = ``
                    if(sobra > 0) end = start + sobra
                }

                const itemsN = await Items.findAll({ where: { User: message.author.id }, attributes: ['Item', 'Quantity'] })
                if(itemsN) {
                    for(let i = 0; i < itemsN.length; i++) {
                        item.push(itemsN[i].Item)
                        quantity.push(itemsN[i].Quantity)
                    }
                }

                for(let i = start; i < end; i++) {
                    let index = item.indexOf(modules[position][i])
                    let cantidad = quantity[index] || 0

                    list += `${DataItem(modules[position][i], 'Emoji')} **${modules[position][i]}** : ${cantidad}\n`
                }

                Embed(message, `${items[position]}:`, `${list}\n${extra}`, '', 'Page ' + page + ' of ' + pages)
            } else return
        }
	},
};