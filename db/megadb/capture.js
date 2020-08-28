const megadb = require('megadb')
const Items = require('../../../../models/Items')
const Trainers = require('../../../../models/Trainers')

// const { Catch } = require('../../controllers/catch')
const { Catch } = require('./catch')
const { PokeCatch } = require('../../controllers/pokecatch')

let spawn_pokemon = new megadb.memoDB('spawn_pokemon')

const Capture = async (message, ball, num, dex) => {
    if(!spawn_pokemon.tiene(message.guild.id)) {
        spawn_pokemon.establecer(message.guild.id, {})
    }
    if(!spawn_pokemon.tiene(`${message.guild.id}.${message.channel.id}`)) {
        spawn_pokemon.establecer(`${message.guild.id}.${message.channel.id}`, {
            pokemon_spawn: [],
            level_spawn: 0,
            place_spawn: '',
            gender_spawn: '',
            status_spawn: '',
            psmax_spawn: 0,
            psactual_spawn: 0,
            iv_hp_spawn: 0,
        })
    }
    let { pokemon_spawn, level_spawn, place_spawn, gender_spawn, status_spawn, psmax_spawn, psactual_spawn, iv_hp_spawn} = await spawn_pokemon.obtener(`${message.guild.id}.${message.channel.id}`)

    if(pokemon_spawn.length > 0) {
        await Items.update({ Quantity: num - 1 }, { where: { User: message.author.id, Item: ball } })

        let x = await Catch(message, pokemon_spawn[0], level_spawn, psactual_spawn, iv_hp_spawn, status_spawn, place_spawn, ball, gender_spawn)

        if (!x) return message.reply(`you couldn't catch **${pokemon_spawn[0]}**, try again.`)
        if (!dex.includes(pokemon_spawn[0])) {
            dex.push(pokemon_spawn[0])
            message.channel.send(`**${pokemon_spawn[0]}** has been added to your pokédex!`)
            await Trainers.update({ Pokedex: dex.join(",") }, { where: { User: message.author.id } })
        }
        return PokeCatch(message, pokemon_spawn[0], ball, gender_spawn, level_spawn, iv_hp_spawn)
    } else message.reply(`the last Pokémon is no longer available.`)
}

module.exports = { Capture }

