const Pokemon = require('../../../models/Pokemon')

const { GetData } = require('./data')
const { GetNature } = require('./getNature')
const { CalcStat, CalcIv, GetGender, GetShiny } = require('./datapoke')

const CreatePoke = async (message, pokemon, ball, select, level) => {
    let hp = CalcStat()
    let attack = CalcStat()
    let defense = CalcStat()
    let spattack = CalcStat()
    let spdefense = CalcStat()
    let speed = CalcStat()

    await Pokemon.create({
        User: message.author.id,
        Pokemon: pokemon,
        Pokeball: ball,
        Name: pokemon,
        Shiny: GetShiny(),
        Flag: GetData(pokemon, 'Flag'),
        Gender: GetGender(),
        Nature: GetNature(),
        Level: level,
        Hp: hp,
        Attack: attack,
        Defense: defense,
        SpAttack: spattack,
        SpDefense: spdefense,
        Speed: speed,
        IV: CalcIv(hp, attack, defense, spattack, spdefense, speed),
        Friendship: GetData(pokemon, 'Friendship'),
        Select: select,
    })
}

module.exports = { CreatePoke }