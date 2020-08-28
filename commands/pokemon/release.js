module.exports = {
	name: 'release',
    description: 'Libera un Pokémon.',
    aliases: ['rel'],
    guildOnly: true,
	async execute(message, args) {
        const Trainers = require('../../../../models/Trainers')
        const Pokemon = require('../../../../models/Pokemon')
        const Duels = require('../../../../models/Duels')
        const Traders = require('../../../../models/Traders')
        const Npc = require('../../../../models/Npc')
        const Discord = require('discord.js')

        if(!args[0]) return message.reply('using this command is: ``' + process.env.PREFIX + 'release [Number]``')
        if(isNaN(args[0]) || args[0] < 1) return
        
        const user = await Trainers.findOne({ 
            where: { User: message.author.id },
            attributes: ['Order','Direction'],
        })
        if(!user) return

        const duel = await Duels.findOne({ where: { FirstUser: message.author.id, Accept: true }, attributes: ['ID'] })
        if(duel) return

        const npc = await Npc.findOne({ where: { User: message.author.id }, attributes: ['ID'] })
        if(npc) return

        const trade = await Traders.findOne({ where: { FirstUser: message.author.id, Accept: true }, attributes: ['ID'] })
        if(trade) return

        const pokemon = await Pokemon.findAll({ 
            where: { 
                User: message.author.id,
            },
            order: [
                [user.Order, user.Direction],
            ],
            attributes: ['ID','Name','Select'],
        })

        if(pokemon.length < 1 || args[0] > pokemon.length) return
        if(pokemon.length == 1) return message.reply(`you can't free your only pokémon.`)

        let position = parseInt(args[0])

        message.reply('Are you sure you want to free **' + pokemon[args[0] - 1].Name + '**? type `yes` or `no`')
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 })
        collector.on('collect', async message => {
            if (message.content == "yes") {
                await Pokemon.destroy({ where: { ID: pokemon[position - 1].ID } })
                if(pokemon[args[0] - 1].Select > 0) await Pokemon.update({ Select: 1 }, { where: { ID: pokemon[0].ID } })
                return message.reply(`you have released **${pokemon[args[0] - 1].Name}**.`)
            } else if (message.content.toLowerCase() == "no") {
                return
            }
        })
	},
};