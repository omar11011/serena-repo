module.exports = {
	name: 'redirect',
    description: 'Redirecciona el canal de Spawn.',
    aliases: ['redirect'],
    guildOnly: true,
	async execute(message, args, client) {
        const Guilds = require('../../../../models/Guilds')

        if(!message.member.hasPermission('ADMINISTRATOR')) return
        if(!args[0] && args[0].length < 20) return

        const guild = await Guilds.findOne({ where: { Guild: message.guild.id }, attributes: ['Type', 'Channel'] })

        let list = []
        let q = 1
        if(guild.Type === 'Vip') q = 3
        else if(guild.Type === 'Premium') q = 6

        let channels = []
        if(guild.Channel) {
            let column = guild.Channel
            channels = column.split(",")
        }

        if(args[0].toLowerCase() === 'info') {
            if(channels.length > 0) {
                for(let i = 0; i < channels.length; i++) {
                    list.push(`<#${channels[i]}>`)
                }
                return message.channel.send(`The server channels that are enabled for spawn are: ${list.join(" | ")}`)
            } else return message.reply('this server does not have any spawn channels yet.')
        }

        let idChannel = args[0].slice(2, -1).toString()
        let channel = client.channels.cache.get(idChannel)

        if(!args[1]) {
            if(channels.includes(idChannel)) message.reply(`this channel is already part of the spawn.`)
            else {
                if(q > channels.length) {
                    try {
                        channel.send(':white_check_mark: Redirection successful!')
                        channels.push(idChannel)
                        await Guilds.update({ Channel: channels.join(",") }, { where: { Guild: message.guild.id } })
                        return
                    } catch (e) {
                        return message.reply(`Oops! An error has occurred, check my permissions on the selected channel and if it exists.`)
                    }
                } else {
                    return message.reply(`This server has reached the spawn channel limit. Delete some using ` + '`' + process.env.PREFIX + 'redirect <#Channel> disable`')
                }
            }
        } else {
            let option = args[1].toLowerCase()

            if(option === 'disable') {
                if(!channels.includes(idChannel)) return message.reply(`this channel is not part of the server spawn.`)
                else {
                    try {
                        channel.send(':white_check_mark: Spawn has been disabled on this channel.')
                        let newchannels = []
                        for(let i = 0; i < channels.length; i++) {
                            if(channels[i] !== idChannel) newchannels.push(channels[i])
                        }
                        await Guilds.update({ Channel: newchannels.join(",") }, { where: { Guild: message.guild.id } })
                        return
                    } catch(error) {
                        console.log(error)
                    }
                }
            }
        }
	},
};