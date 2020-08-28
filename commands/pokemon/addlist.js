module.exports = {
	name: 'addlist',
    description: 'Agrega pokémones a tu lista de ventas.',
    aliases: ['addlist'],
    guildOnly: true,
	async execute(message, args) {
        const Trainers = require('../../../../models/Trainers')
        const Pokemon = require('../../../../models/Pokemon')
        const Duels = require('../../../../models/Duels')

        const { DataItem } = require('../../controllers/dataItem')

        if(!args[0] || !args[1]) return message.reply('using this command is: ``' + process.env.PREFIX + 'addlist [Number] [Price]``')
        
        const trainer = await Trainers.findOne({ where: { User: message.author.id }, attributes: ['Order', 'Direction'] })
        if(!trainer) return

        const duel = await Duels.findOne({ where: { FirstUser: message.author.id, Accept: true }, attributes: ['ID'] })
        if(duel) return

        const pokemon = await Pokemon.findAll({ where: { User: message.author.id }, attributes: ['ID', 'Name'], order: [ [trainer.Order, trainer.Direction] ] })

        if(isNaN(args[0]) || args[0] < 1 || args[0] > pokemon.length || isNaN(args[1]) || args[1] < 1 || args[1] > 1000000000) return

        let position = parseInt(args[0])
        let price = parseInt(args[1])

        await Pokemon.update({ Sale: true, Price: price }, { where: { ID: pokemon[position - 1].ID , User: message.author.id } })
        message.reply(`**${pokemon[position - 1].Name}** is now for sale and its price is **${price}${DataItem('Pokecuarto', 'Emoji')}**`)
	},
};