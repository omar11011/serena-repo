module.exports = {
	name: 'rename',
    description: 'Renombra a tu Pokémon.',
    aliases: ['rename'],
    guildOnly: true,
	async execute(message, args) {
        const Pokemon = require('../../../../models/Pokemon')
        
        const pokemon = await Pokemon.findOne({ where: { User: message.author.id, Select: 1, }, attributes: ['Pokemon', 'Name'] })
        if(!pokemon) return 

        if(!args[0]) {
            if(pokemon.Pokemon === pokemon.Name) return

            try {
                await Pokemon.update({ Name: pokemon.Pokemon }, { where: { User: message.author.id, Select: 1 } })
                message.reply(`your pokémon's name has been reset.`)
                return
            } catch(error) {
                console.log(error)
            }
        }

        let name = args.join(" ")
        if(name.length > 30) return message.reply(`your pokémon's name cannot exceed 30 characters.`)

        try {
            await Pokemon.update({ Name: name }, { where: { User: message.author.id, Select: 1 } })
        } catch (e) {
            console.log(e)
        }
        
        return message.reply(`your **${pokemon.Pokemon}'s** new name is now **${name}**.`)
	},
};