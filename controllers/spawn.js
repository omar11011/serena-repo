const Spawn = require('../../../models/Spawn')
const Guilds = require('../../../models/Guilds')

const spawn = require('../data/spawn')
const Status = require('../data/status')

const { GetData } = require('./data')
const { StatPS } = require('./stats')
const { ChannelSend } = require('../utils/embed')
const { GetImage } = require('../controllers/image')
const { TranslatePlace, TranslateStatus } = require('../utils/translate')
const Male = require('../data/unisex/male')
const Female = require('../data/unisex/female')
const None = require('../data/unisex/none')

const gender = ['Male', 'Female']

const PokeSpawn = async (message, client) => {
    const guild = await Guilds.findOne({ where: { Guild: message.guild.id }, attributes: ['Channel'] })

    let pokemon = spawn[Math.floor(Math.random() * spawn.length)]
    let modulePlace = require('../data/places/others')
    let level = Math.ceil(Math.random() * 40)
    let sex = gender[Math.floor(Math.random() * gender.length)]
    let iv = Math.ceil(Math.random() * 31)
    let psmax = StatPS(pokemon, level, iv)
    let psactual = Math.ceil(Math.random() * psmax)
    let status = 'Normal'
    let disc = ' :male_sign:'

    if(GetData(pokemon, 'Type').includes('Agua')) modulePlace = require('../data/places/agua')
    else if(GetData(pokemon, 'Type').includes('Volador')) modulePlace = require('../data/places/volador')

    if(Male.includes(pokemon)) sex = 'Male'
    else if(Female.includes(pokemon)) sex = 'Female'
    else if(None.includes(pokemon)) sex = 'None'
    
    if(Math.random() > 0.8) status = Status[Math.floor(Math.random() * Status.length)]
    if(sex === 'Female') disc = ' :female_sign:'
    else if(sex === 'None') disc = ''

    let place = modulePlace[Math.floor(Math.random() * modulePlace.length)]
    let channel = message.channel.id
    if(guild.Channel) channel = guild.Channel

    try {
        let existSpawn = await Spawn.findOne({ where: { Guild: message.guild.id, Channel: channel } })
        if (existSpawn) {
            try {
                await Spawn.destroy({where: { Guild: message.guild.id, Channel: channel }})
            } catch (error) {
                console.error(error)
            }
        }
        try {
            await Spawn.create({
                Guild: message.guild.id,
                Channel: channel,
                Pokemon: pokemon, 
                Level: level, 
                Gender: sex, 
                Place: place,
                Status: status,
                PSmax: psmax,
                PSactual: psactual,
                Iv: iv,
            })
        } catch (error) {
            console.error(error)
        }
    } catch (error) {
        console.error(error)
    }

    let pokeimg = GetImage(pokemon, false)

    return ChannelSend(message, client, channel, '', `A **${pokemon}**${disc} has appeared ${TranslatePlace(place)}. Use some poke ball before he manages to escape or someone anticipates you.\n\n**Level**: ${level}\n**HP**: ${psactual}/${psmax}\n**Status**: ${TranslateStatus(status)}`, pokeimg)
}

module.exports = { PokeSpawn }