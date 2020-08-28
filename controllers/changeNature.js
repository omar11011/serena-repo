const Mints = require('../data/items/mint')

const ChangeNature = Item => {
    let Nature
    let mint = Item.split(" ")
    let nature = mint[0]

    if(Mints.includes(Item) && mint[1] === 'Mint') {
        Nature = nature
    }

    return Nature
}

module.exports = { ChangeNature }