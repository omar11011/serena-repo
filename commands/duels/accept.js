module.exports = {
	name: 'acceptaaaaa',
    description: 'Acepta una batalla.',
    aliases: ['acceptaaaaa'],
    guildOnly: true,
	async execute(message, args) {
        const Duels = require('../../../../models/Duels')
        const Pokemon = require('../../../../models/Pokemon')
        const Traders = require('../../../../models/Traders')

        const { StatPS, StatOthers } = require('../../controllers/stats')
        const { ImgBattle } = require('../../utils/imgbattle')

        let time = Math.round((new Date()).getTime() / 1000)

        const trade = await Traders.findOne({ where: { FirstUser: message.author.id, Accept: true }, attributes: ['ID'] })
        if(trade) return
        
        const duel = await Duels.findOne({ where: { FirstUser: message.author.id, Accept: true }, attributes: ['ID'] })
        if(duel) return

        const myDuel = await Duels.findOne({ where: { SecondUser: message.author.id, Accept: false }, attributes: ['FirstUser'] })
        if(!myDuel) return

        const myPokemon = await Pokemon.findOne({ 
            where: { User: message.author.id, Select: 1 },
            attributes: ['ID','Pokemon','Shiny','Pokeball','Name','Level','Hp','Attack','Defense','SpAttack','SpDefense','Speed','HpPE','AttackPE','DefensePE','SpAttackPE','SpDefensePE','SpeedPE','Nature'],
        })
        const rivalPokemon = await Pokemon.findOne({ 
            where: { User: myDuel.FirstUser, Select: 1 },
            attributes: ['ID','Pokemon','Shiny','Pokeball','Name','Level','Hp','Attack','Defense','SpAttack','SpDefense','Speed','HpPE','AttackPE','DefensePE','SpAttackPE','SpDefensePE','SpeedPE','Nature'],
        })

        let hprival = StatPS(rivalPokemon.Pokemon, rivalPokemon.Level, rivalPokemon.Hp, rivalPokemon.HpPE)
        let myhp = StatPS(myPokemon.Pokemon, myPokemon.Level, myPokemon.Hp, myPokemon.HpPE)

        await Duels.update({ 
            Accept: true,
            Pokemon: rivalPokemon.Pokemon,
            IdPokemon: rivalPokemon.ID,
            Level: rivalPokemon.Level,
            Hp: hprival,
            Attack: StatOthers(rivalPokemon.Pokemon, rivalPokemon.Level, 'Attack', rivalPokemon.Attack, rivalPokemon.AttackPE, rivalPokemon.Nature),
            Defense: StatOthers(rivalPokemon.Pokemon, rivalPokemon.Level, 'Defense', rivalPokemon.Defense, rivalPokemon.DefensePE, rivalPokemon.Nature),
            SpAttack: StatOthers(rivalPokemon.Pokemon, rivalPokemon.Level, 'SpAttack', rivalPokemon.SpAttack, rivalPokemon.SpAttackPE, rivalPokemon.Nature),
            SpDefense: StatOthers(rivalPokemon.Pokemon, rivalPokemon.Level, 'SpDefense', rivalPokemon.SpDefense, rivalPokemon.SpDefensePE, rivalPokemon.Nature),
            Speed: StatOthers(rivalPokemon.Pokemon, rivalPokemon.Level, 'Speed', rivalPokemon.Speed, rivalPokemon.SpeedPE, rivalPokemon.Nature),
            Time: time -10,
        }, 
        { where: { FirstUser: myDuel.FirstUser, SecondUser: message.author.id } })

        try {
            await Duels.create({
                FirstUser: message.author.id,
                SecondUser: myDuel.FirstUser,
                Accept: true,
                Pokemon: myPokemon.Pokemon,
                IdPokemon: myPokemon.ID,
                Level: myPokemon.Level,
                Hp: myhp,
                Attack: StatOthers(myPokemon.Pokemon, myPokemon.Level, 'Attack', myPokemon.Attack, myPokemon.AttackPE, myPokemon.Nature),
                Defense: StatOthers(myPokemon.Pokemon, myPokemon.Level, 'Defense', myPokemon.Defense, myPokemon.DefensePE, myPokemon.Nature),
                SpAttack: StatOthers(myPokemon.Pokemon, myPokemon.Level, 'SpAttack', myPokemon.SpAttack, myPokemon.SpAttackPE, myPokemon.Nature),
                SpDefense: StatOthers(myPokemon.Pokemon, myPokemon.Level, 'SpDefense', myPokemon.SpDefense, myPokemon.SpDefensePE, myPokemon.Nature),
                Speed: StatOthers(myPokemon.Pokemon, myPokemon.Level, 'Speed', myPokemon.Speed, myPokemon.SpeedPE, myPokemon.Nature),
                Time: time - 10,
            })
        } catch (e) {
            console.log(e)
            return
        }
        ImgBattle(message, rivalPokemon.Pokemon, rivalPokemon.Shiny, hprival, myDuel.FirstUser, rivalPokemon.Pokeball, myPokemon.Pokemon, myPokemon.Shiny, myhp, message.author.id, myPokemon.Pokeball)
	},
};