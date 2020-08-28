module.exports = {
	name: 'moves',
    description: 'Ver todos los movimientos de tu pokémon.',
    aliases: ['moves', 'mov'],
    guildOnly: true,
	async execute(message, args) {
        const Pokemon = require('../../../../models/Pokemon')
        const Pokedex = require('../../data/pokedex')

        const { GetData } = require('../../controllers/data')
        const { NamePoke } = require('../../controllers/datapoke')
        const { Embed } = require('../../utils/embed')
        const { Transform } = require('../../utils/transform')

        const pokemon = await Pokemon.findOne({ 
            where: { User: message.author.id, Select: 1 },
            attributes: ['Pokemon'],
        })
        if(!pokemon) return

        let Poke = pokemon.Pokemon

        if(args[0]) Poke = NamePoke(Transform(args.join(" ")), 'Name')
        if(args.join(" ").toLowerCase().trim() === "ho-oh") Poke = 'Ho-Oh'
        if(!Pokedex.includes(Poke)) return

        let moves = GetData(Poke, 'Moves')

        const Info = () => {
            let cadena = ''
            for(let i = 0; i < moves.length; i++) {
                cadena += `[${i + 1}] **${moves[i].name}** | Level: ${moves[i].level}\n`
            }
            return cadena
        }

        Embed(message, `${Poke} Movements:`, Info() + '\n\nTo use a move in battle: ``' + process.env.PREFIX + 'move [Number]``')
	},
};