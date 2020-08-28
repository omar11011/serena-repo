module.exports = {
	name: 'fish',
    description: 'Pescar.',
    aliases: ['pescar'],
    guildOnly: true,
    cooldown: 15,
    alert: true,
	async execute(message, args) {
        const Trainers = require('../../../../models/Trainers')

        const { Fish } = require('../../controllers/fish')
        const { DataItem } = require('../../controllers/dataItem')

        const trainer = await Trainers.findOne({ where: { User: message.author.id }, attributes: ['Credits'] })
        if(!trainer) return message.reply(`you are not registered as a pokémon trainer.`)
        
        let result = Fish()
        let quantity = result[1]
        let pokemon = `(X${quantity}) **${result[0]}**${DataItem(result[0], 'Emoji')}`
        let prize = result[2]

        await Trainers.update({ Credits: trainer.Credits + prize }, { where: { User: message.author.id } })
        message.reply(`Congratulations! Earned ${prize}${DataItem('Pokecuarto', 'Emoji')} for fishing ${pokemon}`)
        return
	},
};