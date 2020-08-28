module.exports = {
	name: 'nickname',
    description: 'Cambiar nombre a tu mascota pokémon.',
    aliases: ['nickname'],
    guildOnly: true,
	async execute(message, args) {
        const Pets = require('../../../../models/Pets')

        const { ActionsPet } = require('../../controllers/pet')
        
        const pet = await Pets.findOne({ where: { User: message.author.id }, attributes: ['ID', 'Pokemon', 'Name', 'Food', 'TimeFood', 'TimeClean', 'TimePlay'] })
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

        if(!args[0]) {
            if(pet.Pokemon === pet.Name) return

            try {
                await Pets.update({ Name: pet.Pokemon }, { where: { User: message.author.id, ID: pet.ID } })
                message.reply(`your pet's name has been reset.`)
                return
            } catch(error) {
                console.log(error)
            }
        }

        let name = []
        for(let i = 0; i < args.length; i++) {
            name.push(args[i])
        }
        name = name.join(" ")

        try {
            await Pets.update({ Name: name }, { where: { User: message.author.id, ID: pet.ID } })
            message.reply(`your **${pet.Pokemon}'s** new name is now **${name}**.`)
        } catch {
            message.reply(`there was a problem trying to rename your pet, please try again.`)
        }
	},
};