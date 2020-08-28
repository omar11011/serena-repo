const { Nature } = require('../data/nature')

const GetNature = () => {

    let nature = Nature[Math.floor(Math.random() * Nature.length)]
    
    return nature
}

module.exports = { GetNature }