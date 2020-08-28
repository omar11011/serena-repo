const { DataItem } = require('../controllers/dataItem')
const { Transform } = require('../utils/transform')

const NameShiny = (pokemon, ball, shiny) => {
    let pokeball = ''
    if(ball) pokeball = DataItem(ball, 'Emoji')

    pokemon = Transform(pokemon)

    let namepoke = `${pokeball} | ${pokemon}`

    if(shiny) namepoke = `${pokeball} | :star: ${pokemon}`

    return namepoke
}

module.exports = { NameShiny }