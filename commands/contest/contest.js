module.exports = {
    name: 'contest',
    description: 'Concurso Pokémon',
    aliases: ['concurso'],
    guildOnly: true,
    async execute(message, args) {
        const Pets = require('../../../../models/Pets')
        const Trainers = require('../../../../models/Trainers')
        const Ribbons = require('../../../../models/Ribbons')
        const Contests = require('../../../../models/Contests')
        const Discord = require("discord.js")
        const canvas = require('canvas')

        const { DataItem } = require('../../controllers/dataItem')
        const { GetData } = require('../../controllers/data')
        const { DataMove } = require('../../controllers/dataMove')
        const { Thumb, EmbedAttachment } = require('../../utils/embedcolor')
        const { TranslateContest } = require('../../utils/translate')
        const { JudgePoints } = require('../../controllers/contest')
        const Names = require('../../data/contest/trainers')
        const Pokes = require('../../data/contest/pokemon')

        const trainer = await Trainers.findOne({ where: { User: message.author.id }, attributes: ['Gender'] })

        const contest = await Contests.findOne({ where: { Guild: message.guild.id, Channel: message.channel.id }, attributes: ['ID'] })
        if (contest) return message.reply(`someone is currently in competition on this channel.`)

        const pet = await Pets.findOne({ where: { User: message.author.id }, attributes: ['ID', 'Pokemon', 'Name', 'Level', 'Charisma', 'Beauty', 'Sweetness', 'Ingenuity', 'Hardness'] })
        if (!pet) return message.reply(`you don't have any pets.`)

        Contests.create({ Guild: message.guild.id, Channel: message.channel.id })

        let difficulty
        if (pet.Level <= 10) difficulty = "Normal"
        else if (pet.Level > 10 && pet.Level <= 30) difficulty = "High"
        else if (pet.Level > 30 && pet.Level <= 50) difficulty = "Advanced"
        else difficulty = "Master"

        let Typecontest = ["Carisma", "Belleza", "Dulzura", "Ingenio", "Dureza"]
        let typecontest = Typecontest[Math.floor(Math.random() * Typecontest.length)]

        let name1 = Names[Math.floor(Math.random() * Names.length)]
        let name2 = Names[Math.floor(Math.random() * Names.length)]
        let name3 = Names[Math.floor(Math.random() * Names.length)]
        let name4 = message.author.username

        let poke1 = Pokes[Math.floor(Math.random() * Pokes.length)]
        let poke2 = Pokes[Math.floor(Math.random() * Pokes.length)]
        let poke3 = Pokes[Math.floor(Math.random() * Pokes.length)]
        let poke4 = pet.Pokemon

        let img1 = `http://serenabot.xyz/img/persons/contest/female/${Math.ceil(Math.random() * 40)}.png`
        let img2 = `http://serenabot.xyz/img/persons/contest/female/${Math.ceil(Math.random() * 40)}.png`
        let img3 = `http://serenabot.xyz/img/persons/contest/female/${Math.ceil(Math.random() * 40)}.png`
        let img4 = `http://serenabot.xyz/img/persons/profile/Female/1.png`
        if (trainer.Gender === 'Male') img4 = `http://serenabot.xyz/img/persons/profile/Male/1.png`

        let imgpoke1 = `http://serenabot.xyz/img/pet/${poke1.split(" ").join("_")}.png`
        let imgpoke2 = `http://serenabot.xyz/img/pet/${poke2.split(" ").join("_")}.png`
        let imgpoke3 = `http://serenabot.xyz/img/pet/${poke3.split(" ").join("_")}.png`
        let imgpoke4 = `http://serenabot.xyz/img/pet/${poke4.split(" ").join("_")}.png`

        const lienzo = canvas.createCanvas(350, 170)
        const ctx = lienzo.getContext('2d')

        const capa1 = await canvas.loadImage(img1)
        ctx.drawImage(capa1, 10, 12, 64, 64)
        const capa2 = await canvas.loadImage(img2)
        ctx.drawImage(capa2, 10, 94, 64, 64)
        const capa3 = await canvas.loadImage(img3)
        ctx.drawImage(capa3, 180, 12, 64, 64)
        const capa4 = await canvas.loadImage(img4)
        ctx.drawImage(capa4, 180, 94, 64, 64)

        ctx.font = '13px Arial'
        ctx.fillStyle = '#ffffff'
        ctx.textAlign = "start"

        ctx.fillText(name1, 74, 42)
        ctx.fillText(`(${poke1})`, 74, 59)
        ctx.fillText(name2, 244, 42)
        ctx.fillText(`(${poke2})`, 244, 59)
        ctx.fillText(name3, 74, 124)
        ctx.fillText(`(${poke3})`, 74, 141)
        ctx.fillText(name4, 244, 124)
        ctx.fillText(`(${poke4})`, 244, 141)

        let command = '`' + process.env.PREFIX + 'moves ' + poke4 + '`'
        const attachment = new Discord.MessageAttachment(lienzo.toBuffer(), 'contest.png')
        EmbedAttachment(message, '', '', `**Pokémon Contest!**\n\n**Difficulty**: ${difficulty}\n**Type Contest**: ${TranslateContest(typecontest)}\n\nThere will be 4 rounds in which you will have to make movements that both the public and the judges like. To see the list of moves use s!moves ${command}. Answer with the number of the move you will use each turn. Good luck!\n\n**Note**: No matter the level, you can use any move.`, attachment, 'attachment://contest.png')

        let moves1 = GetData(poke1, 'Moves')
        let nmoves1 = moves1.length
        let moves2 = GetData(poke2, 'Moves')
        let nmoves2 = moves2.length
        let moves3 = GetData(poke3, 'Moves')
        let nmoves3 = moves3.length
        let moves4 = GetData(poke4, 'Moves')
        let nmoves4 = moves4.length

        const Turn = (num, moves, trainer, imgtrainer, namepokemon, pokemon) => {
            let p1, p2, p3, p4, result
            let name = moves[num - 1].name
            let prob = Math.random() * 100

            if (DataMove(name, 'Precision') < prob) {
                Thumb(message, trainer, imgtrainer, `**${namepokemon}** was not accurate in making his move **${name}** so he got 0 points from the judges.`, pokemon)
                result = [0, 0, 0, 0]
                return result
            } else {
                p1 = JudgePoints(typecontest, name)
                p2 = JudgePoints(typecontest, name)
                p3 = JudgePoints(typecontest, name)
                p4 = JudgePoints(typecontest, name)
                Thumb(message, trainer, imgtrainer, `**${namepokemon}** used **${name}**, each judge's score is ...\n\n**Sukizo**: ${p1}/10\n**Fantina**: ${p2}/10\n**Raúl**: ${p3}/10\n**Vivian Meridian**: ${p4}/10`, pokemon)
                result = [p1, p2, p3, p4]
                return result
            }
        }

        const Text = (round) => {
            Thumb(message, `Pokémon Contest | Round ${round}`, '', `You have 10 seconds to write the number of the move you want to make.`, '')
        }

        let points11, points12, points13, points14, points21, points22, points23, points24, points31, points32, points33, points34, points41, points42, points43, points44 = [0, 0, 0, 0]
        let r11, r12, r13, r14, r21, r22, r23, r24, r31, r32, r33, r34, r41, r42, r43, r44 = 0

        setTimeout(async () => {
            let collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 10000 })
            collector.on('collect', message => {
                if (!message) points41 = [0, 0, 0, 0]

                if (!isNaN(message.content)) {
                    if (message.content > nmoves4 || message.content < 1) message.content = 1
                    points41 = Turn(message.content, moves4, name4, img4, poke4, imgpoke4)
                } else {
                    points41 = Turn(1, moves4, name4, img4, poke4, imgpoke4)
                }
            })

            points11 = await Turn(Math.ceil(Math.random() * nmoves1), moves1, name1, img1, poke1, imgpoke1)
            points21 = await Turn(Math.ceil(Math.random() * nmoves2), moves2, name2, img2, poke2, imgpoke2)
            points31 = await Turn(Math.ceil(Math.random() * nmoves3), moves3, name3, img3, poke3, imgpoke3)
            await Text('1')

            r11 = points11[0] + points11[1] + points11[2] + points11[3]
            r21 = points21[0] + points21[1] + points21[2] + points21[3]
            r31 = points31[0] + points31[1] + points31[2] + points31[3]
        }, 10000)

        setTimeout(async () => {

            let collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 10000 })
            collector.on('collect', message => {
                if (!message) points42 = [0, 0, 0, 0]

                if (!isNaN(message.content)) {
                    if (message.content > nmoves4 || message.content < 1) message.content = 1
                    points42 = Turn(message.content, moves4, name4, img4, poke4, imgpoke4)
                } else {
                    points42 = Turn(1, moves4, name4, img4, poke4, imgpoke4)
                }
            })

            points12 = await Turn(Math.ceil(Math.random() * nmoves1), moves1, name1, img1, poke1, imgpoke1)
            points22 = await Turn(Math.ceil(Math.random() * nmoves2), moves2, name2, img2, poke2, imgpoke2)
            points32 = await Turn(Math.ceil(Math.random() * nmoves3), moves3, name3, img3, poke3, imgpoke3)
            await Text('2')

            r12 = points12[0] + points12[1] + points12[2] + points12[3]
            r22 = points22[0] + points22[1] + points22[2] + points22[3]
            r32 = points32[0] + points32[1] + points32[2] + points32[3]
        }, 25000)

        setTimeout(async () => {

            let collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 10000 })
            collector.on('collect', message => {
                if (!message) points43 = [0, 0, 0, 0]

                if (!isNaN(message.content)) {
                    if (message.content > nmoves4 || message.content < 1) message.content = 1
                    points43 = Turn(message.content, moves4, name4, img4, poke4, imgpoke4)
                } else {
                    points43 = Turn(1, moves4, name4, img4, poke4, imgpoke4)
                }
            })

            points13 = await Turn(Math.ceil(Math.random() * nmoves1), moves1, name1, img1, poke1, imgpoke1)
            points23 = await Turn(Math.ceil(Math.random() * nmoves2), moves2, name2, img2, poke2, imgpoke2)
            points33 = await Turn(Math.ceil(Math.random() * nmoves3), moves3, name3, img3, poke3, imgpoke3)
            await Text('3')

            r13 = points13[0] + points13[1] + points13[2] + points13[3]
            r23 = points23[0] + points23[1] + points23[2] + points23[3]
            r33 = points33[0] + points33[1] + points33[2] + points33[3]
        }, 40000)

        setTimeout(async () => {


            let collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 10000 })
            collector.on('collect', message => {
                if (!message) points44 = [0, 0, 0, 0]

                if (!isNaN(message.content)) {
                    if (message.content > nmoves4 || message.content < 1) message.content = 1
                    points44 = Turn(message.content, moves4, name4, img4, poke4, imgpoke4)
                } else {
                    points44 = Turn(1, moves4, name4, img4, poke4, imgpoke4)
                }
            })

            points14 = await Turn(Math.ceil(Math.random() * nmoves1), moves1, name1, img1, poke1, imgpoke1)
            points24 = await Turn(Math.ceil(Math.random() * nmoves2), moves2, name2, img2, poke2, imgpoke2)
            points34 = await Turn(Math.ceil(Math.random() * nmoves3), moves3, name3, img3, poke3, imgpoke3)
            await Text('4')

            r14 = points14[0] + points14[1] + points14[2] + points14[3]
            r24 = points24[0] + points24[1] + points24[2] + points24[3]
            r34 = points34[0] + points34[1] + points34[2] + points34[3]
        }, 55000)

        setTimeout(async () => {
            if (typeof points41 === 'undefined') points41 = [0, 0, 0, 0]
            if (typeof points42 === 'undefined') points42 = [0, 0, 0, 0]
            if (typeof points43 === 'undefined') points43 = [0, 0, 0, 0]
            if (typeof points44 === 'undefined') points44 = [0, 0, 0, 0]

            r41 = points41[0] + points41[1] + points41[2] + points41[3]
            r42 = points42[0] + points42[1] + points42[2] + points42[3]
            r43 = points43[0] + points43[1] + points43[2] + points43[3]
            r44 = points44[0] + points44[1] + points44[2] + points44[3]

            let j1 = r11 + r12 + r13 + r14
            let j2 = r21 + r22 + r23 + r24
            let j3 = r31 + r32 + r33 + r34
            let j4 = r41 + r42 + r43 + r44



            let puntajes = [j1, j2, j3, j4]
            let mayor = 0
            for (i = 0; i < puntajes.length; i++) {
                if (puntajes[i] > mayor) {
                    mayor = puntajes[i]
                }
            }
            let position = puntajes.indexOf(mayor)
            let description = `**${name1}**: ${j1} points\n**${name2}**: ${j2} points\n**${name3}**: ${j3} points\n**${name4}**: ${j4} points`

            if (position == 0) {
                Thumb(message, `Win: ${poke1}`, imgpoke1, `**${name1}** has won the contest!\n\n${description}`, img1)
            } else if (position == 1) {
                Thumb(message, `Win: ${poke2}`, imgpoke2, `**${name2}** has won the contest!\n\n${description}`, img2)
            } else if (position == 2) {
                Thumb(message, `Win: ${poke3}`, imgpoke3, `**${name3}** has won the contest!\n\n${description}`, img3)
            } else if (position == 3) {
                Thumb(message, `Win: ${poke4}`, imgpoke4, `**${name4}** has won the contest!\n\n${description}`, img4)

                let liston
                if (typecontest === "Carisma") liston = 'Coolness Master Ribbon'
                else if (typecontest === "Belleza") liston = 'Beauty Master Ribbon'
                else if (typecontest === "Dulzura") liston = 'Cuteness Master Ribbon'
                else if (typecontest === "Ingenio") liston = 'Cleverness Master Ribbon'
                else if (typecontest === "Dureza") liston = 'Toughness Master Ribbon'

                message.reply(`you have won a **${liston}** ${DataItem(liston, 'Emoji')}. Congratulations!`)

                await Ribbons.create({ User: message.author.id, Ribbon: liston })
            }
            await Contests.destroy({ where: { Guild: message.guild.id, Channel: message.channel.id } })
        }, 70000)
    },
};