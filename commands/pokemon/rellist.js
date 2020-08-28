module.exports = {
	name: 'rellist',
    description: 'Elimina pokémones de tu lista de ventas.',
    aliases: ['rellist'],
    guildOnly: true,
	async execute(message, args) {
        const Trainers = require('../../../../models/Trainers')
        const Pokemon = require('../../../../models/Pokemon')

        if(!args[0]) return message.reply('using this command is: ``' + process.env.PREFIX + 'rellist [Number]``')
        
        const trainer = await Trainers.findOne({ where: { User: message.author.id }, attributes: ['Order', 'Direction'] })
        if(!trainer) return

        const pokemon = await Pokemon.findAll({ where: { User: message.author.id }, attributes: ['ID', 'Name', 'Sale'], order: [ [trainer.Order, trainer.Direction] ] })

        if(isNaN(args[0]) || args[0] < 1 || args[0] > pokemon.length) return

        let position = parseInt(args[0])

        if(!pokemon[position - 1].Sale) return 

        await Pokemon.update({ Sale: false, Price: null }, { where: { ID: pokemon[position - 1].ID , User: message.author.id } })
            message.reply(`**${pokemon[position - 1].Name}** is no longer for sale.`)
	},
};