module.exports = {
	name: 'move',
    description: 'Mueve durante la batalla.',
    aliases: ['move'],
    guildOnly: true,
    cooldown: 10,
	async execute(message, args) {
        if(!args[0] || isNaN(args[0]) || args[0] < 1) return

        const Duels = require('../../../../models/Duels')
        const Pokemon = require('../../../../models/Pokemon')
        const Trainers = require('../../../../models/Trainers')

        const { GetData } = require('../../controllers/data')
        const { DataMove } = require('../../controllers/dataMove')
        const { GetImage } = require('../../controllers/image')
        const { DamageMove, Accuracy } = require('../../controllers/damage')
        const { GetExp, NeedExp } = require('../../controllers/exp')
        const { NameComparation } = require('../../utils/namecomparation')
        const { Thumb } = require('../../utils/embedcolor')
        const { TimeAwait } = require('../../utils/timeAwait')

        const user = await Duels.findOne({ where: { FirstUser: message.author.id, Accept: true } })
        if(!user) return

        const trainer = await Trainers.findOne({ where: { User: message.author.id }, attributes: ['Region', 'Pokedex'] })
        const pokemon = await Pokemon.findOne({ where: { User: message.author.id, Select: 1 }, attributes: ['XP','Gender','Name','Attack','Defense','Friendship','Shiny'] })

        const rival = await Duels.findOne({ where: { FirstUser: user.SecondUser, Accept: true } })
        const moves = GetData(user.Pokemon, 'Moves')

        if(args[0] > moves.length) return

        let move = moves[args[0] - 1].name
        let level = moves[args[0] - 1].level
        let time = Math.round((new Date()).getTime() / 1000)
        let img = GetImage(user.Pokemon, pokemon.Shiny)

        if(!DataMove(move, 'TypeMove'))  return
        // if(time - user.Time < 10){
        //     TimeAwait(message, 10 - (time - user.Time))
        //     return
        // }
        if(user.Level < level) return message.reply(`**${user.Pokemon}** will not be able to use **${move}** until he reaches level **${level}**.`)

        let attack = ''
        let defense = ''

        if(DataMove(move, 'TypeMove') === 'Physical') attack = user.Attack, defense = rival.Defense
        else if(DataMove(move, 'TypeMove') === 'Special') attack = user.SpAttack, defense = rival.SpDefense
        else return

        if(!user.Status) {
            let accuracy = Accuracy(move, user.Accuracy, rival.Evasion)

            if(Math.random() > accuracy) {
                await Duels.update({ Time: time }, { where: { FirstUser: message.author.id } })
                Thumb(message, message.author.tag, message.author.avatarURL(), `**${rival.Pokemon}** has dodged **${move}** from **${pokemon.Name}**.`, img)
                return
            }

            let damage = DamageMove(user.Pokemon, user.Level, attack, defense, move, rival.Pokemon)

            if(rival.Hp - damage > 0) {
                await Duels.update({ Hp: rival.Hp - damage }, { where: { FirstUser: user.SecondUser, Accept: true } })
                await Duels.update({ Time: time }, { where: { FirstUser: message.author.id, Accept: true } })
                Thumb(message, message.author.tag, message.author.avatarURL(), `**${pokemon.Name}** used **${move}** against **${rival.Pokemon}** and dealt ${damage} damage.\n\n**[HP] ${pokemon.Name}**: ${user.Hp}\n**[HP] ${rival.Pokemon}**: ${rival.Hp - damage}`, img)
                return
            }

            let Exp = GetExp(user.Level, rival.Pokemon, rival.Level, 1)
            let Need = NeedExp(user.Pokemon, user.Level)
            let f = Math.ceil(Math.random() * 3)

            Thumb(message, message.author.tag, message.author.avatarURL(), `**${pokemon.Name}** used **${move}** against **${rival.Pokemon}** and dealt ${damage} damage.\n\n**[HP] ${pokemon.Name}**: ${user.Hp}\n**[HP] ${rival.Pokemon}**: 0`, img)
            
            Duels.destroy({ where: { FirstUser: message.author.id, Accept: true } })
            Duels.destroy({ where: { FirstUser: user.SecondUser, Accept: true } })

            if(pokemon.XP + Exp >= Need) {
                let sobra = (pokemon.XP + Exp) - Need
                console.log(Exp, Need, sobra)
                message.reply(`Congratulations! **${user.Pokemon}** has reached level **${user.Level + 1}**.`)
                
                if(GetData(user.Pokemon, 'TypeEvolution') === "Level") {
                    let evolution = GetData(user.Pokemon,'Evolution',pokemon.Gender,trainer.Region,user.Level + 1,'','','','','',pokemon.Attack,pokemon.Defense)

                    if(evolution) {
                        let column = trainer.Pokedex
                        let pokedex = column.split(",")
                        let name = NameComparation(pokemon.Pokemon, pokemon.Name, evolution)

                        await Pokemon.update({ Pokemon: evolution, Name: name, Level: user.Level + 1, XP: sobra, Friendship: pokemon.Friendship + f }, { where: { User: message.author.id, ID: user.IdPokemon } })
                        message.reply(`Congratulations! **${user.Pokemon}** has evolved into **${evolution}**.`)
                        if(!pokedex.includes(evolution)) {
                            pokedex.push(evolution)
                            await Trainers.update({ Pokedex: pokedex.join(",") }, { where: { User: message.author.id } })
                        }
                    }
                    else await Pokemon.update({ Level: user.Level + 1, XP: sobra, Friendship: pokemon.Friendship + f }, { where: { User: message.author.id, ID: user.IdPokemon } })
                }
                else await Pokemon.update({ Level: user.Level + 1, XP: sobra, Friendship: pokemon.Friendship + f }, { where: { User: message.author.id, ID: user.IdPokemon } })
            }
            else await Pokemon.update({ XP: pokemon.XP + Exp, Friendship: pokemon.Friendship + f }, { where: { User: message.author.id, ID: user.IdPokemon } })

            return message.channel.send(`**${message.author.tag}** was the winner!`)
        }
	},
};