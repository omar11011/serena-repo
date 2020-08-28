module.exports = {
	name: 'food',
    description: 'Alimenta a tu mascota pokémon.',
    aliases: ['food'],
    guildOnly: true,
	async execute(message, args) {
        const Pets = require('../../../../models/Pets')
        const Items = require('../../../../models/Items')

        const { DataItem } =require('../../controllers/dataItem')
        const { ActionsPet } = require('../../controllers/pet')
        
        const pet = await Pets.findOne({ where: { User: message.author.id }, attributes: ['ID', 'Pokemon', 'Name', 'Food', 'TimeFood', 'TimeClean', 'TimePlay'] })
        if(!pet) return message.reply(`you don't have any pets.`)

        let time = Math.round((new Date()).getTime() / 1000)
        let food = pet.Food - ActionsPet(pet.TimeFood)
        let clean = pet.Clean - ActionsPet(pet.TimeClean)
        let play = pet.Play - ActionsPet(pet.TimePlay)

        if(food <= 0 || clean <= 0 || play <= 0) {
            if(food <= 0) message.reply(`**${pet.Name}** has fled due to lack of food.`)
            else if(clean <= 0) message.reply(`**${pet.Name}** has fled due to lack of cleanliness.`)
            else if(play <= 0) message.reply(`**${pet.Name}** has run away for lack of fun.`)

            await Pets.destroy({ where: { User: message.author.id } })
            return
        }

        const item = await Items.findOne({ where: { User: message.author.id, Item: 'Pokelito' }, attributes: ['Quantity'] })
        if(!item || item.Quantity <= 0) return message.reply(`you don't have any more pokélitos ${DataItem('Pokelito', 'Emoji')} to give **${pet.Name}**.\nBuy more using ` + '`' + process.env.PREFIX + 'buy pokelito`')

        if(food >= 100) return message.reply(`**${pet.Name}** is satisfied.`)

        let points = 5
        let newPoints = food + points
        if(newPoints > 100) newPoints = 100

        Items.update({ Quantity: item.Quantity - 1 }, { where: { User: message.author.id, Item: 'Pokelito' } })
        await Pets.update({ Food: newPoints, TimeFood: time }, { where: { User: message.author.id, ID: pet.ID } })
        return message.reply(`you have fed **${pet.Name}** a pokélito ${DataItem('Pokelito', 'Emoji')}!`)
	},
};