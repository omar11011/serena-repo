const megadb = require('megadb')

const module_spawn = require('../../data/spawn')
const module_status = require('../../data/status')
const module_male = require('../../data/unisex/male')
const module_female = require('../../data/unisex/female')
const module_none = require('../../data/unisex/none')
let module_place = require('../../data/places/others')

const { GetData } = require('../../controllers/data')
const { StatPS } = require('../../controllers/stats')
const { ChannelSend } = require('../../utils/embed')
const { GetImage } = require('../../controllers/image')
const { TranslatePlace, TranslateStatus } = require('../../utils/translate')

let spawn_pokemon = new megadb.memoDB('spawn_pokemon')
const gender = ['Male', 'Female']

const Spawn = async (message, client, channel) => {
    if(!spawn_pokemon.tiene(message.guild.id)) {
        spawn_pokemon.establecer(message.guild.id, {})
    }
    if(!spawn_pokemon.tiene(`${message.guild.id}.${channel}`)) {
        spawn_pokemon.establecer(`${message.guild.id}.${channel}`, {
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

    let pokemon = module_spawn[Math.floor(Math.random() * module_spawn.length)]
    let pokeimg = GetImage(pokemon, false)
    let level = Math.ceil(Math.random() * 40)
    let sex = gender[Math.floor(Math.random() * gender.length)]
    let iv = Math.ceil(Math.random() * 31)
    let psmax = StatPS(pokemon, level, iv)
    let psactual = Math.ceil(Math.random() * psmax)
    let status = 'Normal'
    let disc = ' :male_sign:'

    if(GetData(pokemon, 'Type').includes('Agua')) module_place = require('../../data/places/agua')
    else if(GetData(pokemon, 'Type').includes('Volador')) module_place = require('../../data/places/volador')
    let place = module_place[Math.floor(Math.random() * module_place.length)]

    if(module_male.includes(pokemon)) sex = 'Male'
    else if(module_female.includes(pokemon)) sex = 'Female'
    else if(module_none.includes(pokemon)) sex = 'None'

    if(Math.random() > 0.8) status = module_status[Math.floor(Math.random() * module_status.length)]
    if(sex === 'Female') disc = ' :female_sign:'
    else if(sex === 'None') disc = ''

    spawn_pokemon.establecer(`${message.guild.id}.${channel}`, {
        pokemon_spawn: [pokemon],
        level_spawn: level,
        place_spawn: place,
        gender_spawn: sex,
        status_spawn: status,
        psmax_spawn: psmax,
        psactual_spawn: psactual,
        iv_hp_spawn: iv,
    })

    return ChannelSend(message, client, channel, '', `A **${pokemon}**${disc} has appeared ${TranslatePlace(place)}. Use some poke ball before he manages to escape or someone anticipates you.\n\n**Level**: ${level}\n**HP**: ${psactual}/${psmax}\n**Status**: ${TranslateStatus(status)}`, pokeimg)
}

module.exports = { Spawn }