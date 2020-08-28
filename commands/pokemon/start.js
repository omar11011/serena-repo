module.exports = {
	name: 'start',
    description: 'Empezar tu aventura Pokémon.',
    aliases: ['start'],
    guildOnly: true,
	async execute(message, args) {
        const Trainers = require('../../../../models/Trainers')
        const Items = require('../../../../models/Items')

        const { Embed } = require('../../utils/embed')
        const { DataItem } = require('../../controllers/dataItem')

        const images = [
            "https://i.imgur.com/APfSypg.gif",
            "https://i.imgur.com/MeB5Z5j.gif",
            "https://i.imgur.com/nG4u9x0.gif",
            "https://i.imgur.com/nw8jqJT.gif",
            "https://i.imgur.com/5eHbrDy.gif",
            "https://i.imgur.com/42q9BpR.gif",
            "https://i.imgur.com/X824l3P.gif",
            "https://i.imgur.com/cnU86oX.gif",
            "https://i.imgur.com/2Hhv5HX.gif",
            "https://i.imgur.com/40lLlJg.gif",
            "https://i.imgur.com/aYNYnLa.gif",
            "https://i.imgur.com/Jcm6aJJ.gif",
        ]
        let img = images[Math.floor(Math.random() * images.length)]

        const user = await Trainers.findOne({ 
            where: { User: message.author.id },
            attributes: ['ID'],
        })
        if(user) return 

        try {
            await Trainers.create({ User: message.author.id, Name: message.author.username })
        } catch {
            await Trainers.create({ User: message.author.id })
        }
        await Items.create({ User: message.author.id, Item: "Poke Ball", Quantity: 100 })
        await Items.create({ User: message.author.id, Item: "Ultra Ball", Quantity: 30 })
        await Items.create({ User: message.author.id, Item: "Premier Ball", Quantity: 20 })

        Embed(message, 'Successful registration!', `Congratulations! Now you can capture all the existing Pokémon.\nGood luck ${message.author.username}!`, img)
        
        message.reply('now choose a region with ``' + process.env.PREFIX + 'region``')
        message.author.send(`<a:pokesaludo:697872213201780808> ¡Welcome ${message.author.tag}!\n\nYou have received\n• Poke Ball: 150 ${DataItem('Poke Ball','Emoji')}\n• Ultra Ball: 30 ${DataItem('Ultra Ball','Emoji')}\n• Premier Ball: 20 ${DataItem('Premier Ball','Emoji')}\n\nFor you to catch a pokemon you must use the command ${process.env.PREFIX}use [ball], you will not always be able to catch it since this depends on the catch ratio of the pokemon.`)
	},
};