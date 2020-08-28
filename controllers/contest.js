const JudgePoints = (typecontest, move) => {
    let result

    const { DataMove } = require('../controllers/dataMove')

    if(DataMove(move, 'Contest') === typecontest) result = 10 - Math.floor(Math.random() * 4)
    else result = Math.ceil(Math.random() * 5)

    return result
}

module.exports = { JudgePoints }