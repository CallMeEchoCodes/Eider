const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'ping',
	description: 'See the bots ping.',
	usage: 'ping',
	cooldown: 5,
	aliases: [ 'latency', 'pong' ],
	async execute(client, message) {
		message.channel.send('Pinging...').then((msg) => {
			const ping = msg.createdTimestamp - message.createdTimestamp;
			const embed = new MessageEmbed()
				.setColor('RANDOM')
				.setTitle('Pong!')
				.setDescription(`The bots ping is ${ping}ms.`);
			message.channel.send({ embeds: [embed] });
			msg.delete();
		});
	},
};
