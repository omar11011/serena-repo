module.exports = {
	name: 'coderef',
    description: 'Tu código de referidos.',
    aliases: ['coderef'],
    guildOnly: true,
	async execute(message, args) {
        const Trainers = require('../../../../models/Trainers')

        const trainer = await Trainers.findOne({ where: { User: message.author.id }, attributes: ['CodeRef'] })
        if(!trainer) return

        if(!trainer.CodeRef) {
            let newcode = 1000 + Math.ceil(Math.random() * 99999900)
            const code = await Trainers.findOne({ where: { CodeRef: newcode }, attributes: ['ID'] })
            if(code) return message.reply('an error occurred while trying to create your referral code. Please try again.')

            try {
                await Trainers.update({ CodeRef: newcode }, { where: { User: message.author.id } })
                return message.reply(`your code to get referrals is **${newcode}**. Any user who writes **${process.env.PREFIX}ref ${newcode}** on the official server will be counted as your referral.`)
            } catch(error) {
                console.log(error)
            }
        } else return message.reply(`your code to get referrals is **${trainer.CodeRef}**. Any user who writes **${process.env.PREFIX}ref ${trainer.CodeRef}** on the official server will be counted as your referral.`)
	},
};