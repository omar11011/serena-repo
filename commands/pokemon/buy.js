module.exports = {
	name: 'buy',
    description: 'Compra de la tienda',
    aliases: ['buy','comprar'],
    guildOnly: true,
	async execute(message, args) {
        const Trainers = require('../../../../models/Trainers')
        const Pokemon = require('../../../../models/Pokemon')
        const Items = require('../../../../models/Items')
        const Duels = require('../../../../models/Duels')
        const Pets = require('../../../../models/Pets')
        const Discord = require('discord.js')

        const { Transform } = require('../../utils/transform')
        const { DataItem } = require('../../controllers/dataItem')
        const { EmbedColor } = require('../../utils/embedcolor')
        const { GetNature } = require('../../controllers/getNature')

        if(!args[0]) return message.reply('using this command is: **' + process.env.PREFIX + 'buy [Item]``')
        
        const user = await Trainers.findOne({ where: { User: message.author.id }, attributes: ['Credits', 'Gems'] })
        if(!user || !args[0]) return

        if(args[0].toLowerCase() === 'pokemon') {
            if(!args[1]) return message.reply('using this command is: **' + process.env.PREFIX + 'buy pokemom [ID]``')
            if(isNaN(args[1]) || args[1] < 1) return

            let id = parseInt(args[1])
            const pokemon = await Pokemon.findOne({ where: { ID: id }, attributes: ['ID', 'User', 'Pokemon', 'Sale', 'Select', 'Price'] })

            if(pokemon.Sale === false || pokemon.User === message.author.id) return
            if(pokemon.Select > 0) return message.reply(`you can't buy this Pokémon because its trainer is currently using it as a partner.`)
            if(pokemon.Price > user.Credits) return message.reply(`you don't have **${pokemon.Price}**${DataItem('Pokecuarto', 'Emoji')} to buy **${pokemon.Pokemon}**.`)

            const duel = await Duels.findOne({ where: { IdPokemon: pokemon.ID, Accept: true }, attributes: ['ID'] })
            if(duel) return message.reply(`you can't buy this pokémon because its trainer is in a battle right now.`)

            Trainers.update({ Credits: user.Credits - pokemon.Price }, { where: { User: message.author.id } })
            await Pokemon.update({ User: message.author.id, Select: 0, Sale: false, Price: null }, { where: { ID: pokemon.ID } })

            message.reply(`you bought **${pokemon.Pokemon}** for a price of **${pokemon.Price}${DataItem('Pokecuarto', 'Emoji')}**`)
        } if(args[0].toLowerCase() === 'pet') {
            const modulePet = require('../../data/pet')
            const gender = ['Male', 'Female']
            let price = 1000
            let time = Math.round((new Date()).getTime() / 1000)

            const List = () => {
                let list = []
                for(let i = 0; i < modulePet.length; i++) {
                    list.push(`• **${modulePet[i]}** | Number: ${i + 1}`)
                }
                let result = `Each pet costs ${price}${DataItem('Pokecuarto', 'Emoji')}, if you want to buy one write ` + '``' + process.env.PREFIX + 'buy pet [Number]``\n\n' + `${list.join("\n")}`
                EmbedColor(message, '', '', '', result)
            }
            
            const pets = await Pets.findOne({ where: { User: message.author.id }, attributes: ['Pokemon'] })
            if(!args[1]) {
                List()
            } else {
                let number = parseInt(args[1])
                if(number > modulePet.length) return

                if(pets) {
                    message.reply("You already have a pet, are you sure you want to buy another? type `yes` or `no`. Remember that you will lose the level in your new pet.")
                    const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 5000 });
                    collector.on('collect', async message => {
                        if (message.content.toLowerCase() == "yes") {
                            await Trainers.update({ Credits: user.Credits - price }, { where: { User: message.author.id } })
                            await Pets.destroy({ where: { User: message.author.id } })
                            await Pets.create({
                                User: message.author.id,
                                Pokemon: modulePet[number - 1],
                                Name: modulePet[number - 1],
                                Gender: gender[Math.floor(Math.random() * gender.length)],
                                Nature: GetNature(),
                                Date: time,
                                TimeFood: time,
                                TimeClean: time,
                                TimePlay: time,
                            })
                            return message.reply(`Congratulations! You bought **${modulePet[number - 1]}**.`)
                        } else if (message.content == "no") {
                            return
                        }
                    })
                } else {
                    if(user.Credits < price) return message.reply(`you don't have ${price}${DataItem('Pokecuarto', 'Emoji')} to buy a pet.`)
                    else {
                        await Trainers.update({ Credits: user.Credits - price }, { where: { User: message.author.id } })
                        await Pets.create({
                            User: message.author.id,
                            Pokemon: modulePet[number - 1],
                            Name: modulePet[number - 1],
                            Gender: gender[Math.floor(Math.random() * gender.length)],
                            Nature: GetNature(),
                            Date: time,
                            TimeFood: time,
                            TimeClean: time,
                            TimePlay: time,
                        })
                        return message.reply(`Congratulations! You bought **${modulePet[number - 1]}**.`)
                    }
                }
            }
        }
        else {
            let Item = []
            let q = []
            for(let i = 0; i < args.length; i++) {
                if(isNaN(args[i])) Item.push(Transform(args[i]))
                else {
                    if(args[i] > 0) q.push(parseInt(args[i]))
                }
            }
            Item = Item.join(" ")
            let Q = 1
            if(q.length > 0) Q = q[0]
            let price = DataItem(Item, 'Price') * Q
            
            if(isNaN(price)) return message.reply('the sale of this item is not available at the moment or does not exist.')
            if(user.Credits < price) return message.reply(`you don't have ${price}${DataItem('Pokecuarto', 'Emoji')} to buy **(X${Q}) ${Item}** ${DataItem(Item,'Emoji')}`)

            await Trainers.update({ Credits: user.Credits - price }, { where: { User: message.author.id } })

            const pokeitem = await Items.findOne({ 
                where: { User: message.author.id, Item: Item },
                attributes: ['Quantity'],
            })
            if(!pokeitem) await Items.create({ User: message.author.id, Item: Item, Quantity: Q })
            else await Items.update({ Quantity: pokeitem.Quantity + Q }, { where: { User: message.author.id, Item: Item } })
            return message.reply(`you bought **(X${Q}) ${Item}** ${DataItem(Item, 'Emoji')}`)
        }
	},
};