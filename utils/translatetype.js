const TranslateType = Type => {
    let request

    if(Type === 'Acero') request = 'Steel'
    else if(Type === 'Agua') request = 'Water'
    else if(Type === 'Bicho') request = 'Bug'
    else if(Type === 'Dragón') request = 'Dragon'
    else if(Type === 'Eléctrico') request = 'Electric'
    else if(Type === 'Fuego') request = 'Fire'
    else if(Type === 'Fantasma') request = 'Ghost'
    else if(Type === 'Hada') request = 'Fairy'
    else if(Type === 'Hielo') request = 'Ice'
    else if(Type === 'Lucha') request = 'Fighting'
    else if(Type === 'Normal') request = 'Normal'
    else if(Type === 'Planta') request = 'Grass'
    else if(Type === 'Psíquico') request = 'Psychic'
    else if(Type === 'Roca') request = 'Rock'
    else if(Type === 'Siniestro') request = 'Dark'
    else if(Type === 'Tierra') request = 'Ground'
    else if(Type === 'Veneno') request = 'Poison'
    else if(Type === 'Volador') request = 'Flying'

    return request
}

module.exports = { TranslateType }