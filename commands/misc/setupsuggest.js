const { Permissions, MessageEmbed } = require('discord.js');
module.exports = {
	name: 'setupsuggest',
	description: 'Setup suggestions.',
	usage: 'setupsuggest <channel>',
	cooldown: 10,
	args: 1,
	permissions: [ Permissions.FLAGS.ADMINISTRATOR ],
	async execute(client, message, args) {
		if (!args[0].match(/<#[0-9]+>/)) return message.reply('Thats not a channel!');
		const channel = args[0].slice(2, -1);
		client.data.ensure(`guild.${message.guild.id}.suggestChannel`, channel);
		client.data.set(`guild.${message.guild.id}.suggestChannel`, channel);
		const replyChannel = ('<#' + client.data.get(`guild.${message.guild.id}.suggestChannel`) + '>');
		const embed = new MessageEmbed()
			.setTitle('Suggestions channel is now')
			.setColor('BLUE')
			.setTimestamp()
			.setDescription(replyChannel);
		message.reply({ embeds: [embed] });
	},
};