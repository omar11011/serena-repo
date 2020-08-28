const TranslatePlace = place => {
    let result

    if(place === 'sobre el agua') result = 'on the water'
    else if(place === 'bajo el agua') result = 'underwater'
    else if(place === 'volando por los cielos') result = 'flying through the skies'
    else if(place === 'dentro de una cueva') result = 'inside a cave'
    else if(place === 'en la hierba') result = 'on the grass'
    else if(place === 'en la hierba alta') result = 'in the tall grass'
    else if(place === 'encima de una roca') result = 'on top of a rock'
    else if(place === 'descansando en el suelo') result = 'resting on the floor'
    else if(place === 'en frente tuyo') result = 'in front of you'
    else if(place === 'en la hierba espesa') result = 'in the thick grass'


    return result
}

const TranslateStatus = status => {
    let result

    if(status === 'Normal') result = 'Normal'
    else if(status === 'Dormido') result = 'Asleep'
    else if(status === 'Congelado') result = 'Frozen'
    else if(status === 'Paralizado') result = 'Paralyzed'
    else if(status === 'Envenenado') result = 'Poisoned'
    else if(status === 'Quemado') result = 'Burned'

    return result
}

const TranslateContest = type => {
    const { DataItem } = require('../controllers/dataItem')
    let result

    if(type === 'Carisma') result = `Charisma ${DataItem('Coolness Master Ribbon', 'Emoji')}`
    else if(type === 'Belleza') result = `Beauty ${DataItem('Beauty Master Ribbon', 'Emoji')}`
    else if(type === 'Dulzura') result = `Sweetness ${DataItem('Cuteness Master Ribbon', 'Emoji')}`
    else if(type === 'Ingenio') result = `Ingenuity ${DataItem('Cleverness Master Ribbon', 'Emoji')}`
    else if(type === 'Dureza') result = `Hardness ${DataItem('Toughness Master Ribbon', 'Emoji')}`

    return result
}

const TranslateTypeContest = type => {
    let result

    if(type === 'Carisma') result = `Charisma`
    else if(type === 'Belleza') result = `Beauty`
    else if(type === 'Dulzura') result = `Sweetness`
    else if(type === 'Ingenio') result = `Ingenuity`
    else if(type === 'Dureza') result = `Hardness`

    return result
}

module.exports ={ TranslatePlace, TranslateStatus, TranslateContest, TranslateTypeContest }