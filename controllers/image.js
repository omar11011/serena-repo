const { Transform } = require('../utils/transform')

const GetImage = (pokemon, shiny) => {
    pokemon = Transform(pokemon).split(" ").join("_")
    var route = 'http://serenabot.xyz/img/pokemon/'

    if(shiny) route = 'http://serenabot.xyz/img/pokemon/Shiny/'

    let image = `${route}${pokemon}.png`

    if(pokemon.toLowerCase() === 'ho-oh') {
        if(shiny) image = 'http://serenabot.xyz/img/pokemon/Shiny/Ho-Oh.png'
        else image = 'http://serenabot.xyz/img/pokemon/Ho-Oh.png'
    } else if(pokemon.toLowerCase() === 'porygon-z') {
        if(shiny) image = 'http://serenabot.xyz/img/pokemon/Shiny/Porygon-Z.png'
        else image = 'http://serenabot.xyz/img/pokemon/Porygon-Z.png'
    }
    
    return image
}

module.exports = { GetImage }