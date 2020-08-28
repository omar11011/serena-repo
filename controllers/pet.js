const ActionsPet = value => {
    let time = Math.round((new Date()).getTime() / 1000)

    let result = Math.round((time - value) * 100 / 129600)

    return result
}

const Data = (pet, request, level) => {
    let type = ["NaN"]
    let evolution = false

    if(pet === "Bulbasaur") {
        type = ["Planta", "Veneno"]
        if(level >= 16) evolution = "Ivysaur"
    } else if(pet === "Ivysaur") {
        type = ["Planta", "Veneno"]
        if(level >= 32) evolution = "Venusaur"
    } else if(pet === "Venusaur") {
        type = ["Planta", "Veneno"]
    } else if(pet === "Charmander") {
        type = ["Fuego"]
        if(level >= 16) evolution = "Charmeleon"
    } else if(pet === "Charmeleon") {
        type = ["Fuego"]
        if(level >= 36) evolution = "Charizard"
    } else if(pet === "Charizard") {
        type = ["Fuego", "Volador"]
    } else if(pet === "Squirtle") {
        type = ["Agua"]
        if(level >= 16) evolution = "Wartortle"
    } else if(pet === "Wartortle") {
        type = ["Agua"]
        if(level >= 36) evolution = "Blastoise"
    } else if(pet === "Blastoise") {
        type = ["Agua"]
    } else if(pet === "Chikorita") {
        type = ["Planta"]
        if(level >= 16) evolution = "Bayleef"
    } else if(pet === "Bayleef") {
        type = ["Planta"]
        if(level >= 32) evolution = "Meganium"
    } else if(pet === "Meganium") {
        type = ["Planta"]
    } else if(pet === "Cyndaquil") {
        type = ["Fuego"]
        if(level >= 14) evolution = "Quilava"
    } else if(pet === "Quilava") {
        type = ["Fuego"]
        if(level >= 36) evolution = "Typhlosion"
    } else if(pet === "Typhlosion") {
        type = ["Fuego"]
    } else if(pet === "Totodile") {
        type = ["Agua"]
        if(level >= 18) evolution = "Croconaw"
    } else if(pet === "Croconaw") {
        type = ["Agua"]
        if(level >= 30) evolution = "Feraligatr"
    } else if(pet === "Feraligatr") {
        type = ["Agua"]
    } else if(pet === "Alolan Vulpix") {
        type = ["Hielo"]
        if(level >= 20) evolution = "Alolan Ninetales"
    } else if(pet === "Alolan Ninetales") {
        type = ["Hielo", "Hada"]
    }

    if(request === "type") return type
    else if(request === "evolution") return evolution
}

module.exports = { ActionsPet, Data }