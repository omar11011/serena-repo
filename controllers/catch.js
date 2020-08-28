const Spawn = require('../../../models/Spawn')

const { GetData } = require('./data')
const { StatPS } = require('./stats')
const { Bonus } = require('./bonus')

const Catch = async (message, Pokemon, Level, Ps, Iv, Estado, Place, Ball, Gender, Channel) => {
    let atrapado = false

    let ModifEstado = 1
    if (["Dormido", "Congelado"].includes(Estado)) ModifEstado = 2.5
    else if (["Paralizado", "Envenenado", "Quemado"].includes(Estado)) ModifEstado = 1.5

    let ValueHierba = 1
    if (["en la hierba alta", "en la hierba espesa"].includes(Place)) ValueHierba = 1.5

    let Poder = 1

    let bonus = Bonus(message, Ball, Pokemon, Level, Place, Gender)

    let x = ((StatPS(Pokemon, Level, Iv, 0) * 3 - Ps * 2) * ValueHierba * GetData(Pokemon, 'RatioCapture') * bonus / (StatPS(Pokemon, Level, Iv, 0) * 3)) * ModifEstado * Poder

    if (x >= 255) {
        atrapado = true
    }
    else {
        let y = Math.round((65536 / (Math.pow((255 / x), 0.1875))))
        let a1 = Math.ceil(Math.random() * 65536)
        let a2 = Math.ceil(Math.random() * 65536)
        let a3 = Math.ceil(Math.random() * 65536)
        let a4 = Math.ceil(Math.random() * 65536)

        if(y > a1 && y > a2 && y > a3 && y > a4) {
            atrapado = true
        }
    }



    if (atrapado) {
        try {
            Spawn.destroy({ where: { Guild: message.guild.id, Channel: Channel } })
        } catch (error) {
            console.error(error)
        }
    }
    return atrapado
}

module.exports = { Catch }