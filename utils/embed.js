const { MessageEmbed } = require('discord.js')

const { Color, Footer } = require('./random')
// const Color = '#00a86b'
const Oak = 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/d/d9/latest/20200210170225/VS_Profesor_Oak_Masters.png/135px-VS_Profesor_Oak_Masters.png'

const Embed = (message, title, description, image = '', footer = Footer()) => {
    const embed = new MessageEmbed()
        .setColor(Color())
        .setAuthor('Professor Oak', Oak, '')
        .setTitle(title)
        .setDescription(description)
        .setImage(image)
        .setFooter(footer)
    message.channel.send(embed)
}

const ChannelSend = async (message, client, channel, title, description, image) => {
    if (!message.guild.me.hasPermission('VIEW_CHANNEL')) return
    if (!message.guild.me.hasPermission('SEND_MESSAGES')) return

    const embed = new MessageEmbed()
        .setColor(Color())
        .setAuthor('Professor Oak', Oak, '')
        .setTitle(title)
        .setDescription(description)
        .setImage(image)
        .setFooter(Footer())

    let canal = await client.channels.cache.get(channel)

    if (!channel) {
        try {
            return message.channel.send(embed)
        } catch (e) {
            console.log(e)
        }
    } else {
        try {
            return canal.send(embed)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = {
    Embed,
    ChannelSend
}