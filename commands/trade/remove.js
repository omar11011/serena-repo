module.exports = {
	name: 'remove',
    description: 'Agregar un Pokémon al intercambio.',
    aliases: ['remove', 'r'],
    guildOnly: true,
	async execute(message, args) {
        const megadb = require('megadb')

        const Trainers = require('../../../../models/Trainers')
        const Pokemon = require('../../../../models/Pokemon')

        const { Embed } = require('../../utils/embed')

        let trade = new megadb.memoDB('trade')

        if(trade.tiene(message.author.id)) {
            if(!args[0] || !args[1] || isNaN(args[1]) || args[1] < 1) return

            let option = args[0].toLowerCase() 
            if(!["p", "c", "r"].includes(option)) return

            let { receiver, channel, pokemon, show_list, credits, redeems, accept, confirm } = await trade.obtener(message.author.id)

            if(!accept || channel !== message.channel.id || confirm) return

            let other_user = await trade.obtener(receiver)
            let num = parseInt(args[1])

            let check1 = ':white_check_mark:'
            let check2 = ':white_check_mark:'
            if(!confirm) check1 = ':x:'
            if(!other_user.confirm) check2 = ':x:'

            const other = await Trainers.findOne({ where: { User: receiver }, attributes: ['Name'] })

            if(option === 'p') {
                const poke = await Pokemon.findAll({ 
                    where: { User: message.author.id },
                    attributes: ['ID', 'Pokeball', 'Pokemon', 'Shiny', 'Level', 'Select']
                })

                if(num > poke.length) return

                if(pokemon.includes(poke[num - 1].ID)) {
                    let position = pokemon.indexOf(poke[num - 1].ID)
                    console.log(position, pokemon)
                    
                    pokemon.splice(position, 1)
                    console.log(pokemon)
                    show_list.splice(position, 1)
                    console.log(show_list)
                }
            } else {
                if(option === 'c') {
                    if(credits - num < 0) return

                    credits -= num

                } else if(option === 'r') {
                    if(redeems - num < 0) return

                    redeems -= num
                }
                trade.establecer(message.author.id, {
                    receiver: receiver,
                    channel: message.channel.id,
                    pokemon: pokemon,
                    show_list: show_list,
                    credits: credits,
                    redeems: redeems,
                    accept: true,
                    confirm: false,
                })
            }

            let mylist = `${show_list.join("\n")}\n\nCredits: ${credits}\nRedeems: ${redeems}`
            let otherlist = `${other_user.show_list.join("\n")}\n\nCredits: ${other_user.credits}\nRedeems: ${other_user.redeems}`

            Embed(message, `**Trade between ${message.author.username} and ${other.Name}**`, `**${message.author.username}** | ${check1}\n` + '```' + mylist + '```\n' + `**${other.Name}** | ${check2}\n` + '```' + otherlist + '```', '', '')
        }
	},
};