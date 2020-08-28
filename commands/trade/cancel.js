module.exports = {
	name: 'cancel',
    description: 'Cancela un intercambio.',
    aliases: ['cancel'],
    guildOnly: true,
	async execute(message, args) {
        const megadb = require('megadb')

        let trade = new megadb.memoDB('trade')

        if(trade.tiene(message.author.id)) {
            let { receiver, accept } = await trade.obtener(message.author.id)

            if(!accept) return

            trade.eliminar(message.author.id)
            trade.eliminar(receiver)
            return message.channel.send(':white_check_mark: Exchange canceled.')
        }
	},
};