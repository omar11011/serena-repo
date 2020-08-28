const { GetData } = require('./data')
const { DataMove } = require('./dataMove')
const { DamageType } = require('./damageType')

const DamageMove = (Pokemon, Level, Ataque, DefRival, Move, Oponent) => {

    let Bonificacion = 1
    if(GetData(Pokemon, 'Type').includes(DataMove(Move, 'Type'))) Bonificacion = 1.5

    let Variacion = Math.ceil(Math.random() * 16) + 84

    let Efectividad = DamageType(GetData(Pokemon), DataMove(Move, 'Type'))

    let Damage = 0.01 * Bonificacion * Efectividad * Variacion * ((((0.2 * Level + 1) * Ataque * DataMove(Move, 'Damage')) / (25 * DefRival)) + 2)

    let Result = Math.round(Damage)

    return Result
}

const Accuracy = (Move, Precision, Evasion) => {
    let accuracy = (DataMove(Move, 'Precision') / 100) * (Precision - Evasion)

    return accuracy
}

module.exports = { DamageMove, Accuracy }