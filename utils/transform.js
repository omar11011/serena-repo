const { Capitalize } = require('./capitalize')

const Transform = cadena => {
    let pokemon = []
    let content = cadena.split(" ")

    for(let i = 0; i < content.length; i++) {
        pokemon.push(Capitalize(content[i]))
    }

    let Pokemon = pokemon.join(" ")

    return Pokemon
}

module.exports = { Transform }