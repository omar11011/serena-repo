module.exports = {
	name: 'clean',
    description: 'Limpia a tu mascota pokémon.',
    aliases: ['clean'],
    guildOnly: true,
	async execute(message, args) {
        const Pets = require('../../../../models/Pets')

        const { ActionsPet } = require('../../controllers/pet')
        
        const pet = await Pets.findOne({ where: { User: message.author.id }, attributes: ['ID', 'Pokemon', 'Name', 'Clean', 'TimeFood', 'TimeClean', 'TimePlay'] })
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

        if(clean >= 100) return message.reply(`**${pet.Name}** is clean.`)

        await Pets.update({ Clean: 100, TimeClean: time }, { where: { User: message.author.id, ID: pet.ID } })
        return message.reply(`you gave **${pet.Name}** a good bath!`)
	},
};