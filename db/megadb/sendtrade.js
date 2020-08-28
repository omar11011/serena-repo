const megadb = require('megadb')
const Discord = require('discord.js')

let trade = new megadb.memoDB('trade')
let duel = new megadb.memoDB('duel')

const command = word => {
    let result = '`' + process.env.PREFIX + word + '`'
    return result
}

const SendTrade = (message, receiver) => {
    let author = message.author.id
    let filter = false

    if(duel.tiene(author)) {
        message.reply(`You cannot trade as you are currently in a pokémon match.`)
        return
    }
    if(duel.tiene(receiver)) {
        message.reply(`You cannot trade since your user is currently in a pokémon match.`)
        return
    }
    if(trade.tiene(receiver)) {
        message.reply(`this user is currently on an exchange or requesting someone else.`)
        return
    }
    if(!trade.tiene(author)) {
        trade.establecer(author, {
            accept: false,
        })
        trade.establecer(receiver, {
            accept: false,
        })
        message.channel.send(`<@${receiver}>, ${message.author.username} has asked to exchange with you, if you agree write ${command('accept')}`)

        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === receiver, { time: 10000 })
        collector.on('collect', message => {
            if(message.content.toLowerCase() == `${process.env.PREFIX}accept`) {
                filter = true
                trade.establecer(author, {
                    receiver: receiver,
                    channel: message.channel.id,
                    pokemon: [],
                    show_list: [],
                    credits: 0,
                    redeems: 0,
                    accept: true,
                    confirm: false,
                })
                trade.establecer(receiver, {
                    receiver: author,
                    channel: message.channel.id,
                    pokemon: [],
                    show_list: [],
                    credits: 0,
                    redeems: 0,
                    accept: true,
                    confirm: false,
                })
                message.channel.send(`The exchange has started, you can add pokémons using ${command('add p <Number>')}, pokécuartos with ${command('add c <Amount>')} or redeems with ${command('add r quantity')}. To remove just change the ${command('add <option>')} to ${command('remove <option>')}\n<@${author}> <@${receiver}>`)
                console.log('Exchange accepted.')
                return
            }
        })
        setTimeout(() => {
            if(filter == false) {
                trade.eliminar(author)
                trade.eliminar(receiver)
                console.log('Exchange eliminated for not being accepted.')
            }
        }, 10000)
    } else {
        message.reply(`you are currently on an exchange. Use ${command('cancel')}`)
        return
    }
}

module.exports = { SendTrade }