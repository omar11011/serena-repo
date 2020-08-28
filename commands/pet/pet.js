module.exports = {
	name: 'pet',
    description: 'Mostrar mascota pokémon.',
    aliases: ['pet'],
    guildOnly: true,
	async execute(message, args) {
        const Pets = require('../../../../models/Pets')
        const Items = require('../../../../models/Items')
        const { MessageEmbed } = require('discord.js')

        const { GetData } = require('../../controllers/data')
        const { DataItem } = require('../../controllers/dataItem')
        const { NeedExp } = require('../../controllers/exp')
        const { Color } = require('../../utils/random')
        const { ActionsPet } = require('../../controllers/pet')

        const pet = await Pets.findOne({ where: { User: message.author.id } })
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
        
        const item = await Items.findOne({ where: { User: message.author.id, Item: 'Pokelito' }, attributes: ['Quantity'] })
        let num = 0
        if(item) num = item.Quantity

        let time = Math.round((new Date()).getTime() / 1000)
        let emoji = ':male_sign:'
        if(pet.Gender === 'Female') emoji = ':female_sign:'

        const friendTime = () => {
            let result = ''
            let t = time - pet.Date

            if(t < 60) result = `${t} seconds`
            else if(t >= 60 && t < 3600) {
                let minutes = parseInt(t / 60)
                
                let s = ''
                if(minutes > 1) s = 's'

                result = `${minutes} minute${s}`
            }
            else if(t >= 3600 && t < 86400) {
                let hours = parseInt(t / 3600)

                let s = ''
                if(hours > 1) s = 's'

                result = `${hours} hour${s}`
            }
            else if(t >= 86400) {
                let days = parseInt(t / 86400)

                let s = ''
                if(days > 1) s = 's'

                result = `${days} day${s}`
            }

            return result
        }

        let description = `**Level:** ${pet.Level} (${pet.XP}/${NeedExp(pet.Pokemon, pet.Level)} XP)\n**Nature:** ${pet.Nature} ${emoji}\n**Friendship**: ${pet.Friendship} / 500 Points\n\n**Food:** ${food}% :ramen:\n**Play:** ${play}% :video_game:\n**Clean:** ${clean}% :poop:\n\n**Friendship Time:** ${friendTime()}\n**Your Pokélitos:** ${num} ${DataItem('Pokelito', 'Emoji')}`
        
        let column = pet.Pokemon
        let name = column.split(" ").join("_")
        const embed = new MessageEmbed()
            .setColor(Color())
            .setAuthor(message.author.tag, message.author.avatarURL(), '')
            .setTitle(pet.Name)
            .setDescription(description)
            .setThumbnail(`http://serenabot.xyz/img/pet/${name}.png`)
            .setFooter(`To see the actions type ${process.env.PREFIX}action`)
        message.channel.send(embed)
	},
};