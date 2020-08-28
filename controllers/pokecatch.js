const Pokemon = require('../../../models/Pokemon')

const { GetData } = require('./data')
const { GetNature } = require('./getNature')
const { CalcStat, CalcIv, GetShiny } = require('./datapoke')
const { DataItem } = require('./dataItem')
const { Embed } = require('../utils/embed')

const PokeCatch = async (message, pokemon, ball, gender, level, ivhp) => {
    let attack = CalcStat()
    let defense = CalcStat()
    let spattack = CalcStat()
    let spdefense = CalcStat()
    let speed = CalcStat()
    let shiny = GetShiny()

    await Pokemon.create({
        User: message.author.id,
        Pokemon: pokemon,
        Pokeball: ball,
        Name: pokemon,
        Shiny: shiny,
        Flag: GetData(pokemon, 'Flag'),
        Gender: gender,
        Nature: GetNature(),
        Level: level,
        Hp: ivhp,
        Attack: attack,
        Defense: defense,
        SpAttack: spattack,
        SpDefense: spdefense,
        Speed: speed,
        IV: CalcIv(ivhp, attack, defense, spattack, spdefense, speed),
        Friendship: GetData(pokemon, 'Friendship'),
    })

    message.reply(`Congratulations! You have captured a **${pokemon}** ${DataItem(ball, 'Emoji')}`)
    if (shiny === true) return Embed(message, '', `You caught a shiny pokémon!`, 'https://i.imgur.com/nG4u9x0.gif')
    return
}

module.exports = {
    PokeCatch
}