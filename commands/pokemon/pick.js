module.exports = {
	name: 'pick',
    description: 'Elegir una pokémon inicial.',
    aliases: ['pick'],
    guildOnly: true,
	async execute(message, args) {
        const Trainers = require('../../../../models/Trainers')
        const Pokemon = require('../../../../models/Pokemon')
        const Initials = require('../../../../models/Initials')
        
        const { CreatePoke } = require('../../controllers/createpoke')
        const { Embed } = require('../../utils/embed')
        const { Capitalize } = require('../../utils/capitalize')
        const { TranslateType } = require('../../utils/translatetype')

        const user = await Trainers.findOne({ 
            where: { User: message.author.id },
            attributes: ['ID', 'Region'],
        })
        if(!user) return message.reply('you must start your adventure with ``' + process.env.PREFIX + 'start``')
        if(!user.Region) return message.reply('choose a region to travel with ``' + process.env.PREFIX + 'region``')

        const pokemon = await Pokemon.findOne({ 
            where: { User: message.author.id },
            attributes: ['ID'],
        })
        if(pokemon) return message.reply(`you have already chosen your initial pokémon.`)

        const initials = await Initials.findAll({ 
            where: { Region: user.Region },
            attributes: ['Pokemon','Type'],
        })
        const list = () => {
            let cadena = ''
            for(let i = 0; i < initials.length; i++) {
                cadena += '**' + initials[i].Pokemon + '** | Tipo: ' + TranslateType(initials[i].Type) + '\n'
            }
            return cadena
        }

        const Info = () => {
            Embed(message, `${user.Region} pokémon available`, list() + '\nChoose one with ``' + process.env.PREFIX + 'pick [Pokémon]``')
            return
        }
        if(!args[0]){
            Info()
            return
        }

        const select = await Initials.findOne({ 
            where: { Region: user.Region, Pokemon: Capitalize(args[0]) },
            attributes: ['ID'],
        })
        if(!select) {
            Info()
            return
        }

        CreatePoke(message, Capitalize(args[0]), 'Friend Ball', 1, 10)
        await Trainers.update({ Pokedex:  Capitalize(args[0])}, { where: { User: message.author.id } })
        
        return message.reply(`**${Capitalize(args[0])}** will be your first companion. Good luck!`)
	},
};