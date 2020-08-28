module.exports = {
    name: 'use',
    description: 'Usa un ítem.',
    aliases: ['use'],
    guildOnly: true,
    cooldown: 3,
    async execute(message, args) {
        const Trainers = require('../../../../models/Trainers')
        const Pokemon = require('../../../../models/Pokemon')
        const Items = require('../../../../models/Items')
        const Spawn = require('../../../../models/Spawn')

        const { DataItem } = require('../../controllers/dataItem')
        const { GetData } = require('../../controllers/data')
        const { ChangeNature } = require('../../controllers/changeNature')
        const { Transform } = require('../../utils/transform')
        const { NameComparation } = require('../../utils/namecomparation')
        const { Capture } = require('../../db/megadb/capture')

        if (!args[0]) return

        const trainer = await Trainers.findOne({
            where: {
                User: message.author.id
            },
            attributes: ['Region', 'Pokedex'],
        })
        if (!trainer) return

        let pokeColumn = trainer.Pokedex
        let pokes = pokeColumn.split(",")
        let item = Transform(args.join(" "))
        let use = DataItem(item, 'Use')

        if (!use) return

        const pokeitem = await Items.findOne({
            where: {
                User: message.author.id,
                Item: item
            },
            attributes: ['Quantity'],
        })
        let itemEmoji = item + ' ' + DataItem(item, 'Emoji')
        if (!pokeitem || pokeitem.Quantity < 1) return message.reply(`you have no ${itemEmoji} in your inventory.`)

        if (use === "Pokeball") Capture(message, item, pokeitem.Quantity, pokes)
        
        const pokemon = await Pokemon.findOne({
            where: {
                User: message.author.id,
                Select: 1
            },
            attributes: ['Pokemon', 'Name', 'Gender', 'Level', 'Attack', 'Defense', 'HpPE', 'AttackPE', 'DefensePE', 'SpAttackPE', 'SpDefensePE', 'SpeedPE', 'Friendship'],
        })
        if (!pokemon) return message.reply(`you don't have any Pokémon selected.`)

        let ambient = 'NA'
        let evolution = GetData(pokemon.Pokemon, 'Evolution', pokemon.Gender, trainer.Region, pokemon.Level, item, '', pokemon.Attack, pokemon.Defense)
        let type_evolution = GetData(pokemon.Pokemon, 'TypeEvolution')

        if (use === "Evolve Stone" || use === "Mega Stone" || use === "Evolve Item") {
            if (type_evolution === "Stone" || type_evolution === "Mega" || type_evolution === "Evolve Item") {
                if (!evolution) return message.reply(`**${itemEmoji}** has no effect on **${pokemon.Name}**.`)

                await Items.update({
                    Quantity: pokeitem.Quantity - 1
                }, {
                    where: {
                        User: message.author.id,
                        Item: item
                    }
                })
                let name = pokemon.Name
                if (pokemon.Pokemon === pokemon.Name) name = evolution

                await Pokemon.update({ Pokemon: evolution, Name: name }, { where: { User: message.author.id, Select: 1 } })
                if(!pokes.includes(evolution)) {
                    pokedex.push(evolution)
                    await Trainers.update({ Pokedex: pokedex.join(",") }, { where: { User: message.author.id } })
                }

                if (type_evolution === "Stone" || type_evolution === "Evolve Item") return message.reply(`**${pokemon.Pokemon}** has evolved into **${evolution}** thanks to **${itemEmoji}**`)
                else if (type_evolution === "Mega") return message.reply(`**${pokemon.Pokemon}** has evolved mega into **${evolution}** thanks to **${itemEmoji}**`)
            }
        } else if (use === "Mint") {
            await Items.update({ Quantity: pokeitem.Quantity - 1 }, { where: { User: message.author.id, Item: item } })
            await Pokemon.update({ Nature: ChangeNature(item) }, { where: { User: message.author.id, Select: 1 } })

            return message.reply(`the nature of **${pokemon.Name}** has changed to **${ChangeNature(item)}** thanks to **${itemEmoji}**`)
        } else if (use === "Vitamin") {
            await Items.update({ Quantity: pokeitem.Quantity - 1 }, { where: { User: message.author.id, Item: item } })

            if(item === "Zinc") {
                await Pokemon.update({
                    SpDefensePE: pokemon.SpDefensePE + 10
                }, {
                    where: {
                        User: message.author.id,
                        Select: 1
                    }
                })
                message.reply(`**${pokemon.Name}'s** Special Defense PE increased by 10 points thanks to **${itemEmoji}**`)
            } else if(item === "Carbos") {
                await Pokemon.update({
                    SpeedPE: pokemon.SpeedPE + 10
                }, {
                    where: {
                        User: message.author.id,
                        Select: 1
                    }
                })
                message.reply(`**${pokemon.Name}'s** Speed PE increased by 10 points thanks to **${itemEmoji}**`)
            } else if(item === "Protein") {
                await Pokemon.update({
                    AttackPE: pokemon.AttackPE + 10
                }, {
                    where: {
                        User: message.author.id,
                        Select: 1
                    }
                })
                message.reply(`**${pokemon.Name}'s** Attack PE increased by 10 points thanks to **${itemEmoji}**`)
            } else if(item === "Iron") {
                await Pokemon.update({
                    DefensePE: pokemon.DefensePE + 10
                }, {
                    where: {
                        User: message.author.id,
                        Select: 1
                    }
                })
                message.reply(`**${pokemon.Name}'s** Defense PE increased by 10 points thanks to **${itemEmoji}**`)
            } else if(item === "Calcium") {
                await Pokemon.update({
                    SpAttackPE: pokemon.SpAttackPE + 10
                }, {
                    where: {
                        User: message.author.id,
                        Select: 1
                    }
                })
                message.reply(`**${pokemon.Name}'s** Special Attack PE increased by 10 points thanks to **${itemEmoji}**`)
            } else if(item === "More Ps") {
                await Pokemon.update({
                    HpPE: pokemon.HpPE + 10
                }, {
                    where: {
                        User: message.author.id,
                        Select: 1
                    }
                })
                message.reply(`**${pokemon.Name}'s** Health PE increased by 10 points thanks to **${itemEmoji}**`)
            } else if(item === "Rare Candy") {
                await Pokemon.update({ Level: pokemon.Level + 1, XP: 0 }, { where: { User: message.author.id, Select: 1 } })
                message.reply(`**${pokemon.Name}** has risen to level ${pokemon.Level + 1} using **${itemEmoji}**`)

                if (type_evolution === "Level") {
                    let evolution = GetData(pokemon.Pokemon, 'Evolution', pokemon.Gender, trainer.Region, pokemon.Level + 1, item, pokemon.Friendship, pokemon.Attack, pokemon.Defense)

                    if (evolution) {
                        let name = NameComparation(pokemon.Pokemon, pokemon.Name, evolution)
                        await Pokemon.update({ Pokemon: evolution, Name: name }, { where: { User: message.author.id, Select: 1 } })
                        message.reply(`**${pokemon.Name}** has evolved into **${evolution}**.`)

                        if(!pokes.includes(evolution)) {
                            pokes.push(spawn.Pokemon)
                            await Trainers.update({ Pokedex: pokes.join(",") }, { where: { User: message.author.id } })
                        }
                    }
                }
            }
        } else if (use === "Exchange") {
            await Items.update({ Quantity: pokeitem.Quantity - 1 }, { where: { User: message.author.id, Item: item } })
            await Pokemon.update({ Equipped: item }, { where: { User: message.author.id, Select: 1 } })

            message.reply(`you have equipped **${pokemon.Name}** with **${itemEmoji}**`)
        } else return 
    },
};