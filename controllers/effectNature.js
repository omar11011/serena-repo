const EffectNature = (Nature, Stat) => {
    let Multiplier = 1

    if(Nature === 'Bold') {
        if(Stat === 'Attack') Multiplier = 0.9
        if(Stat === 'Defense') Multiplier = 1.1
    }

    if(Nature === 'Modest') {
        if(Stat === 'Attack') Multiplier = 0.9
        if(Stat === 'SpAttack') Multiplier = 1.1
    }

    if(Nature === 'Calm') {
        if(Stat === 'Attack') Multiplier = 0.9
        if(Stat === 'SpDefense') Multiplier = 1.1
    }

    if(Nature === 'Timid') {
        if(Stat === 'Attack') Multiplier = 0.9
        if(Stat === 'Speed') Multiplier = 1.1
    }

    if(Nature === 'Lonely') {
        if(Stat === 'Attack') Multiplier = 1.1
        if(Stat === 'Defense') Multiplier = 0.9
    }

    if(Nature === 'Mild') {
        if(Stat === 'Defense') Multiplier = 0.9
        if(Stat === 'SpAttack') Multiplier = 1.1
    }

    if(Nature === 'Gentle') {
        if(Stat === 'Defense') Multiplier = 0.9
        if(Stat === 'SpDefense') Multiplier = 1.1
    }

    if(Nature === 'Hasty') {
        if(Stat === 'Defense') Multiplier = 0.9
        if(Stat === 'Speed') Multiplier = 1.1
    }

    if(Nature === 'Adamant') {
        if(Stat === 'Attack') Multiplier = 1.1
        if(Stat === 'SpAttack') Multiplier = 0.9
    }

    if(Nature === 'Impish') {
        if(Stat === 'Defense') Multiplier = 1.1
        if(Stat === 'SpAttack') Multiplier = 0.9
    }

    if(Nature === 'Careful') {
        if(Stat === 'SpAttack') Multiplier = 0.9
        if(Stat === 'SpDefense') Multiplier = 1.1
    }

    if(Nature === 'Jolly') {
        if(Stat === 'SpAttack') Multiplier = 0.9
        if(Stat === 'Speed') Multiplier = 1.1
    }

    if(Nature === 'Naughty') {
        if(Stat === 'Attack') Multiplier = 1.1
        if(Stat === 'SpDefense') Multiplier = 0.9
    }

    if(Nature === 'Lax') {
        if(Stat === 'Defense') Multiplier = 1.1
        if(Stat === 'SpDefense') Multiplier = 0.9
    }

    if(Nature === 'Rash') {
        if(Stat === 'SpAttack') Multiplier = 1.1
        if(Stat === 'SpDefense') Multiplier = 0.9
    }

    if(Nature === 'Naive') {
        if(Stat === 'Speed') Multiplier = 1.1
        if(Stat === 'SpDefense') Multiplier = 0.9
    }

    if(Nature === 'Brave') {
        if(Stat === 'Attack') Multiplier = 1.1
        if(Stat === 'Speed') Multiplier = 0.9
    }

    if(Nature === 'Relaxed') {
        if(Stat === 'Defense') Multiplier = 1.1
        if(Stat === 'Speed') Multiplier = 0.9
    }

    if(Nature === 'Quiet') {
        if(Stat === 'SpAttack') Multiplier = 1.1
        if(Stat === 'Speed') Multiplier = 0.9
    }

    if(Nature === 'Sassy') {
        if(Stat === 'SpDefense') Multiplier = 1.1
        if(Stat === 'Speed') Multiplier = 0.9
    }
    
    return Multiplier
}

module.exports = { EffectNature }