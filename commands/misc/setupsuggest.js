const { Permissions } = require('discord.js');
module.exports = {
	name: 'setupsuggest',
	description: 'Setup suggestions.',
	cooldown: 10,
	args: true,
	permissions: [ Permissions.FLAGS.ADMINISTRATOR ],
	async execute(client, message, args) {
		if (!args[0].match('<#')) return message.reply('Thats not a channel!');
		const channel = args[0].slice(2, -1);
		client.data.ensure(`guild.${message.guild.id}.suggestChannel`, channel);
		client.data.set(`guild.${message.guild.id}.suggestChannel`, channel);
		message.channel.send('Suggestions channel is now <#' + client.data.get(`guild.${message.guild.id}.suggestChannel`) + '>');
	},
};