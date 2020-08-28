const { GetData } = require('./data')

const GetExp = (LevelMe, Oponent, LevelOponent, PoderRegalo = 1) => {

    let Base = (GetData(Oponent, 'Hp') * LevelOponent) / 5
    let CorrectorA = Math.pow((2 * LevelOponent + 10), 5 / 2)
    let CorrectorB = Math.pow((LevelOponent + LevelMe + 10), 5 / 2)

    let Exp = Math.round((Base * (CorrectorA / CorrectorB) + 1) * 1.5 * PoderRegalo)
    
    return Exp
}

const NeedExp = (Pokemon, Level) => {
    let Total
    let Type = GetData(Pokemon, 'Increase')
    Level += 1

    if(Type === 'Fast') Total = 4 * Math.pow(Level, 3) / 5

    if(Type === 'Medium') Total = Math.pow(Level, 3)

    if(Type === 'Slow') Total = 5 * Math.pow(Level, 3) / 4

    if(Type === 'Parabolic') Total = (6 * Math.pow(Level, 3) / 5) - (15 * Math.pow(Level, 2)) + (100 * Level) - 140

    if(Type === 'Erratic') {
        if(Level <= 50) Total = Math.pow(Level, 3) * (2 - 0.02 * Level)
        if(Level > 50 && Level <= 68) Total = Math.pow(Level, 3) * (1.5 - 0.01 * Level)
        if(Level > 68 && Level <= 98) {
            let Modulo = Level % 3
            if(Modulo < 1) Modulo = 0
            else if(Modulo > 0 && Modulo < 2) Modulo = 0.008
            else Modulo = 0.014
            Total = Math.pow(Level, 3) * (1.274 - 0.02 * (Level / 3) - Modulo)
        }
        if(Level > 98) Total = Math.pow(Level, 3) * (1.6 - 0.01 * Level)
    }

    if(Type === 'Fluctuating') {
        if(Level <= 15) Total = Math.pow(Level, 3) * (24 + ((Level + 1) / 3)) / 50
        if(Level > 15 && Level <= 35) Total = Math.pow(Level, 3) *(14 + Level) / 50
        if(Level > 35) Total = Math.pow(Level, 3) * (32 + (Level / 2)) / 50
    }

    let Exp = Math.round(Total)
    
    return Exp
}

module.exports = { GetExp, NeedExp }