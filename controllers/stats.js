const { GetData } = require('./data') 
const { EffectNature } = require('./effectNature')

const StatPS = (Pokemon, Level, Iv, EffortPoints = 0) => {
    let Points = 10 + (Level / 100 * ((GetData(Pokemon, 'Hp') * 2) + Iv + EffortPoints)) + Level
    let Stat = Math.round(Points)

    return Stat
}

const StatOthers = (Pokemon, Level, Stat, Iv, EffortPoints, Nature) => {
    let Points = (5 + (Level / 100 * ((GetData(Pokemon, Stat) * 2) + Iv + EffortPoints))) * EffectNature(Nature, Stat)
    let stat = Math.round(Points)
    
    return stat
}

module.exports = { StatPS, StatOthers }