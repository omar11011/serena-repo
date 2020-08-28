module.exports = {
	name: 'tradeaaaaaaaaaaa',
    description: 'Manda solicitud de intercambio a un usuario.',
    aliases: ['tradeaaaaaaaaaaaa'],
    guildOnly: true,
	async execute(message, args) {
        const Trainers = require('../../../../models/Trainers')
        const Pokemon = require('../../../../models/Pokemon')
        const Traders = require('../../../../models/Traders')
        const Duels = require('../../../../models/Duels')

        let mencion = message.mentions.users.first()
        let code = Math.ceil(Math.random() * 10000000000)

        if(!mencion || mencion.bot || mencion.id === message.author.id) return

        const trainer = await Trainers.findOne({ where: { User: message.author.id }, attributes: ['ID'] })
        if(!trainer) return

        const duel = await Duels.findOne({ where: { FirstUser: message.author.id, Accept: true }, attributes: ['ID'] })
        if(duel) return
        
        const trade = await Traders.findOne({ where: { FirstUser: message.author.id, Accept: true }, attributes: ['ID'] })
        if(trade) return
        
        const pokemon = await Pokemon.findAll({ where: { User: message.author.id }, attributes: ['Pokemon'] })
        if(!pokemon || pokemon.length <= 1) return message.reply(`you need to have at least two pokémon to exchange.`)

        Traders.destroy({ where: { FirstUser: message.author.id, Accept: false } })
        Traders.destroy({ where: { SecondUser: message.author.id, Accept: false } })
        Traders.destroy({ where: { FirstUser: mencion.id, Accept: false } })
        Traders.destroy({ where: { SecondUser: mencion.id, Accept: false } })
        await Traders.create({
            FirstUser: message.author.id,
            SecondUser: mencion.id,
            Code: code,
        })
        message.channel.send('<@' + mencion.id + '>, ' + message.author.tag + ' wants to exchange a pokémon with you, accept him with ``' + process.env.PREFIX + 'confirm``')

        setTimeout(async () => {
            await Traders.destroy({ where: { FirstUser: message.author.id, Accept: false } })
        }, 15000)
	},
};