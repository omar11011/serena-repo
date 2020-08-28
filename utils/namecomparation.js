const NameComparation = (pokemon, name, evolution) => {
    let Name = name

    if(pokemon === name) Name = evolution

    return Name
}

module.exports = { NameComparation }