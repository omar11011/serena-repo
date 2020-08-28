module.exports = {
	name: 'confirm',
    description: 'Acepta un intercambio.',
    aliases: ['confirm'],
    guildOnly: true,
	async execute(message, args) {
        const megadb = require('megadb')

        const Trainers = require('../../../../models/Trainers')
        const Pokemon = require('../../../../models/Pokemon')

        let trade = new megadb.memoDB('trade')

        if(trade.tiene(message.author.id)) {
            let my_trade = await trade.obtener(message.author.id)
            let other_trade = await trade.obtener(my_trade.receiver)

            if(my_trade.channel !== message.channel.id) return
            
            if(!other_trade.confirm) {
                //Confirming the first user exchange
                trade.establecer(message.author.id, {
                    receiver: my_trade.receiver,
                    channel: message.channel.id,
                    pokemon: my_trade.pokemon,
                    show_list: my_trade.show_list,
                    credits: my_trade.credits,
                    redeems: my_trade.redeems,
                    accept: true,
                    confirm: true,
                })
                return message.reply(`you have accepted the exchange.`)
            } else {
                //Extracting data
                const trainer1 = await Trainers.findOne({ where: { User: message.author.id }, attributes: ['Credits', 'Redeems'] })
                const trainer2 = await Trainers.findOne({ where: { User: my_trade.receiver }, attributes: ['Credits', 'Redeems'] })

                // Updating pokémons
                if(my_trade.pokemon.length > 0) {
                    for(let i = 0; i < my_trade.pokemon.length; i++) {
                        await Pokemon.update({ User: my_trade.receiver }, { where: { ID: my_trade.pokemon[i] } })
                    }
                }
                if(other_trade.pokemon.length > 0) {
                    for(let i = 0; i < other_trade.pokemon.length; i++) {
                        await Pokemon.update({ User: message.author.id }, { where: { ID: other_trade.pokemon[i] } })
                    }
                }

                // Updating money and redeems
                await Trainers.update(
                    { 
                        Credits: trainer1.Credits - my_trade.credits + other_trade.credits,
                        Redeems: trainer1.Redeems - my_trade.redeems + other_trade.redeems,
                    },
                    { where: { User: message.author.id } 
                })
                await Trainers.update(
                    { 
                        Credits: trainer2.Credits + my_trade.credits - other_trade.credits,
                        Redeems: trainer2.Redeems + my_trade.redeems - other_trade.redeems,
                    },
                    { where: { User: my_trade.receiver } 
                })

                return message.channel.send(`Exchange carried out successfully!\n<@${message.author.id}> <@${my_trade.receiver}>`)
            }
        }
	},
};