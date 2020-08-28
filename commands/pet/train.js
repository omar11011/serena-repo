module.exports = {
	name: 'train',
    description: 'Entrena a tu mascota pokémon.',
    aliases: ['train'],
    guildOnly: true,
    cooldown: 15,
	async execute(message, args) {
        const Pets = require('../../../../models/Pets')

        const { NeedExp } = require('../../controllers/exp')
        const { ActionsPet } = require('../../controllers/pet')
        const { Data } = require('../../controllers/pet')

        const pet = await Pets.findOne({ where: { User: message.author.id }, attributes: ['ID', 'Pokemon', 'Name', 'Level', 'XP', 'Date', 'TimeFood', 'TimeClean', 'TimePlay'] })
        if(!pet) return message.reply(`you don't have any pets.`)

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
        
        let xp = Math.ceil(Math.random() * 30)
        let need = NeedExp(pet.Pokemon, pet.Level)
        let sobra = need - (pet.XP + xp)
        let name = pet.Name

        if(sobra > 0) {
            await Pets.update({ XP: pet.XP + xp }, { where: { User: message.author.id, ID: pet.ID } })
        } else {
            let level = pet.Level + 1
            let evolution = Data(pet.Pokemon, 'evolution', level)
            if(evolution) {
                if(pet.Name === pet.Pokemon) name = evolution
                await Pets.update({ Pokemon: evolution, Name: name, Level: level, XP: Math.abs(sobra) }, { where: { User: message.author.id, ID: pet.ID } })
                message.reply(`**${pet.Name}** has risen to level ${level} and has evolved into **${evolution}**`)
            } else {
                await Pets.update({ Level: level, XP: Math.abs(sobra) }, { where: { User: message.author.id, ID: pet.ID } })
                message.reply(`**${pet.Name}** has risen to level ${level}.`)
            }
        }
        message.reply(`**${name}** has won ${xp} xp!`)
	},
};