module.exports = {
	name: 'select',
    description: 'Libera un Pokémon.',
    aliases: ['select'],
    guildOnly: true,
	async execute(message, args) {
        const Duels = require('../../../../models/Duels')
        const Trainers = require('../../../../models/Trainers')
        const Pokemon = require('../../../../models/Pokemon')
        const Npc = require('../../../../models/Npc')

        const { DataItem } = require('../../controllers/dataItem')

        if(!args[0] || isNaN(args[0]) || args[0] < 1) return
        const trainer = await Trainers.findOne({ 
            where: { User: message.author.id },
            attributes: ['Order','Direction'],
        })
        if(!trainer) return

        const duel = await Duels.findOne({ where: { FirstUser: message.author.id, Accept: true }, attributes: ['ID'] })
        if(duel) return

        const npc = await Npc.findOne({ where: { User: message.author.id }, attributes: ['ID'] })
        if(npc) return

        const select = await Pokemon.findOne({ where: { User: message.author.id, Select: 1 }, attributes: ['ID'] })
        
        const pokemon = await Pokemon.findAll({ 
            where: { User: message.author.id },
            attributes: ['ID','Name','Pokeball'],
        })
        if(!pokemon || args[0] > pokemon.length) return

        if(select) {
            await Pokemon.update({ Select: 0 }, { where: { User: message.author.id, ID: select.ID } })
        }
        await Pokemon.update({ Select: 1 }, { where: { User: message.author.id, ID: pokemon[args[0] - 1].ID } })
        return message.reply(`you have selected **${pokemon[args[0] - 1].Name}** ${DataItem(pokemon[args[0] - 1].Pokeball,'Emoji')}`)
	},
};