const { TranslateType } = require('./translatetype')

const GetType = types => {
    let Types = []

    for(let i = 0; i < types.length; i++) {
        Types.push(TranslateType(types[i]))
    }

    Types = Types.join(" / ")

    return Types
}

module.exports = { GetType }