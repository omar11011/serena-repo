const Guilds = require('../../../models/Guilds')
const discord = require('discord.js')
const megadb = require('megadb')

let spawn_count = new megadb.memoDB('spawn_count')

const { Spawn } = require('../db/megadb/spawn')
const { TimeAwait } = require('../utils/timeAwait')
const cooldowns = require('../bot')

module.exports = async (client, message) => {
    if(message.author.bot) return
    if(!message.content.startsWith(process.env.PREFIX) && message.content.length >= 6) {
        const limit = 20
    
        if(!spawn_count.tiene(message.guild.id)) {
            spawn_count.establecer(message.guild.id, {})
        }
        if(!spawn_count.tiene(`${message.guild.id}.${message.channel.id}`)) {
            spawn_count.establecer(`${message.guild.id}.${message.channel.id}`, { count: 0 })
        }

        let { count } = await spawn_count.obtener(`${message.guild.id}.${message.channel.id}`)
        count += 1

        if(count === limit) {
            spawn_count.establecer(`${message.guild.id}.${message.channel.id}`, { count: 0 })
            
            if(message.guild.me.hasPermission('SEND_MESSAGES')) {
                const guild = await Guilds.findOne({ where: { Guild: message.guild.id }, attributes: ['Channel'] })
                if(!guild) {
                    await Guilds.create({ Guild: message.guild.id })
                    return
                }

                if(!guild.Channel) {
                    Spawn(message, client, message.channel.id)
                } else {
                    let column = guild.Channel
                    let channels = column.split(",")
                    
                    for(let i = 0; i < channels.length; i++) {
                        Spawn(message, client, channels[i])
                    }
                }
            }
        } else spawn_count.establecer(`${message.guild.id}.${message.channel.id}`, { count: count })
    }

    else if(message.content.startsWith(process.env.PREFIX)) {
        const args = message.content.slice(process.env.PREFIX.length).split(/ +/)
        const commandName = args.shift().toLowerCase()

        const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName))

        if (!command) return
        console.log(message.author.tag + " has used: " + message.content)

        if(!message.guild.me.hasPermission('SEND_MESSAGES')) return
        if(command.guildOnly && message.channel.type !== "text") return message.reply("This command cannot be used by DM.")

        if(!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new discord.Collection())
        }
        
        const now = Date.now()
        const timestamps = cooldowns.get(command.name)
        const cooldownAmount = (command.cooldown || 3) * 1000

        if(timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount

            if(now < expirationTime) {
                const timeLeft = Math.ceil((expirationTime - now) / 1000)
                if(command.alert) message.reply(TimeAwait(message, timeLeft))
                return 
            }
        }

        try {
            command.execute(message, args, client)
            timestamps.set(message.author.id, now)
            setTimeout(() => {
                timestamps.delete(message.author.id, cooldownAmount)
            }, cooldownAmount)
        } catch (error) {
            console.error(error)
            message.reply("Error trying to run command.")
        }
    }
}