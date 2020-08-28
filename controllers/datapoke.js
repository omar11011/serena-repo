const { Transform } = require('../utils/transform')

const CalcStat = () => {
    let Stat = Math.ceil(Math.random() * 31)
    return Stat
}

const CalcIv = (Hp, Attack, Defense, SpAttack, SpDefense, Speed) => {
    let Iv = (((Hp + Attack + Defense + SpAttack + SpDefense + Speed) / 186) * 100).toFixed(2)
    return Iv
}

const GetGender = () => {
    let Gender = "Female"
    if(Math.random() >= 0.5) Gender = "Male"
    return Gender
}

const GetShiny = () => {
    let Shiny = false
    let num = Math.ceil(Math.random() * 10000)
    if(num > 9995) Shiny = true
    return Shiny
}

const NamePoke = (Pokemon, Request) => {
    let pokemon = ''
    let shiny = false
    let pokearray = Transform(Pokemon).split(" ")

    if(pokearray[0] === 'Shiny') {
        for(let i = 1; i < pokearray.length; i++) {
            pokemon += `${pokearray[i]} `
        }
        shiny = true
    }
    else pokemon = Pokemon

    if(Request === 'Name') return pokemon
    else if(Request === 'Shiny') return shiny
}

module.exports = { CalcStat, CalcIv, GetGender, GetShiny, NamePoke }