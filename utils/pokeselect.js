const { NeedExp } = require('../controllers/exp')
const { GetData } = require('../controllers/data')
const { DataItem } = require('../controllers/dataItem')
const { StatPS, StatOthers } = require('../controllers/stats')
const { GetType } = require('./gettype')

const { Embed } = require('./embed')
const { NameShiny } = require('./nameshiny')
const { GetImage } = require('../controllers/image')

const PokeSelect = (message, pokemon, name, ball, shiny, level, xp, hp, attack, defense, spattack, spdefense, speed, iv, gender, nature, hppe, attackpe, defensepe, spattackpe, spdefensepe, speedpe, footer = '') => {
    let limit = NeedExp(pokemon, level)
    let HP = StatPS(pokemon, level, hp, hppe)
    let Attack = StatOthers(pokemon, level, 'Attack', attack, attackpe, nature)
    let Defense = StatOthers(pokemon, level, 'Defense', defense, defensepe, nature)
    let SpAttack = StatOthers(pokemon, level, 'SpAttack', spattack, spattackpe, nature)
    let SpDefense = StatOthers(pokemon, level, 'SpDefense', spdefense, spdefensepe, nature)
    let Speed = StatOthers(pokemon, level, 'Speed', speed, speedpe, nature)
    let img = GetImage(pokemon, shiny)

    let description = `**Level**: ${level} | **Exp**: ${xp}/${limit}\n**Gender**: ${gender}\n**Type**: ${GetType(GetData(pokemon, 'Type'))}\n**Nature**: ${nature}\n**HP**: ${HP} - IV: ${hp}/31\n**Attack**: ${Attack} - IV: ${attack}/31\n**Defense**: ${Defense} - IV: ${defense}/31\n**Sp. Atk**: ${SpAttack} - IV: ${spattack}/31\n**Sp. Def**: ${SpDefense} - IV: ${spdefense}/31\n**Speed**: ${Speed} - IV: ${speed}/31\n**Total IV**: ${iv}%`

    if(name == "Ho-Oh") {
        let nombre
        if(shiny == false) nombre = `${DataItem(ball, 'Emoji')} | Ho-Oh`, img = 'http://serenabot.xyz/img/pokemon/Ho-Oh.png'
        else nombre = `${DataItem(ball, 'Emoji')} | :star: Ho-Oh`, img = 'http://serenabot.xyz/img/pokemon/Shiny/Ho-Oh.png'
        Embed(message, nombre, description, img, footer)
    } else if(name === "Porygon-Z") {
        let nombre
        if(shiny == false) nombre = `${DataItem(ball, 'Emoji')} | Porygon-Z`, img = 'http://serenabot.xyz/img/pokemon/Porygon-Z.png'
        else nombre = `${DataItem(ball, 'Emoji')} | :star: Porygon-Z`, img = 'http://serenabot.xyz/img/pokemon/Shiny/Porygon-Z.png'
        Embed(message, nombre, description, img, footer)
    } else {
        Embed(message, NameShiny(name, ball, shiny), description, img, footer)
    }
}

module.exports = { PokeSelect }