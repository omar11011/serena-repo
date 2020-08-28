const Trainers = require('../../../../models/Trainers')
const Items = require('../../../../models/Items')
const Refs = require('../../../../models/Refs')

const { DataItem } = require('../../controllers/dataItem')

let trainer = null
let ref = null
let item = null

module.exports = {
    name: 'claim',
    description: 'Premios por referidos',
    aliases: ['claim'],
    guildOnly: true,
    async execute(message, args) {
        return sendClaim(message, args);
    },
};

const sendClaim = async (message, args) => {
    trainer = await Trainers.findOne({ where: { User: message.author.id }, attributes: ['CodeRef', 'Claim'] })
    ref = await Refs.findAll({ where: { Code: trainer.CodeRef } })
    item = await Items.findOne({ where: { User: message.author.id, Item: 'Master Ball' }, attributes: ['Quantity'] })


    if (!trainer) return

    if (!ref || ref.length < 1) return message.reply(`you don't have any referrals yet.`)


    if (trainer.Claim === 0 && ref.length >= 1) prize(1, 1, message)
    else if (trainer.Claim === 1 && ref.length >= 5) prize(5, 2, message)
    else if (trainer.Claim === 2 && ref.length >= 15) prize(15, 3, message)
    else if (trainer.Claim === 3 && ref.length >= 30) prize(30, 4, message)
    else if (trainer.Claim === 4 && ref.length >= 50) prize(50, 5, message)
    else if (trainer.Claim === 5 && ref.length >= 100) prize(100, 6, message)
    else return message.reply(`you have already received all your pending rewards.`)
}

/**
 * 
 * @param {*} quantity 
 * @param {*} level 
 */
const prize = async (quantity, level, message) => {
    Trainers.update({ Claim: level }, { where: { User: message.author.id } })
    if (item) await Items.update({ Quantity: item.Quantity + quantity }, { where: { User: message.author.id, Item: 'Master Ball' } })
    else await Items.create({ User: message.author.id, Item: 'Master Ball', Quantity: quantity })

    message.reply(`Congratulations! You have received (X${quantity}) Master Ball ${DataItem('Master Ball', 'Emoji')}`)
}