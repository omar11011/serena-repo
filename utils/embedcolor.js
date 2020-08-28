const { MessageEmbed } = require('discord.js')
const { Color } = require('./random')

const EmbedColor = (message, nameAuthor, imgAuthor, image, description = '') => {
    const embed = new MessageEmbed()
        .setColor(Color())
        .setAuthor(nameAuthor, imgAuthor, '')
        .setDescription(description)
        .setImage(image)
    return message.channel.send(embed)
}

const EmbedAttachment = (message, nameAuthor, imgAuthor, description, attachment, image) => {
    const embed = new MessageEmbed()
        .setColor(Color())
        .setAuthor(nameAuthor, imgAuthor, '')
        .setDescription(description)
        .attachFiles(attachment)
        .setImage(image)
    return message.channel.send(embed)
}

const Thumb = (message, author, imgauthor, description, thumb) => {
    const embed = new MessageEmbed()
        .setColor(Color())
        .setAuthor(author, imgauthor, '')
        .setDescription(description)
        .setThumbnail(thumb)
    return message.channel.send(embed)
}

module.exports = { EmbedColor, EmbedAttachment, Thumb }