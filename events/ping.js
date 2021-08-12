const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'messageCreate',
	execute(client, message) {
		if (!message.guild || message.author.bot) return;
		client.data.ensure(`guild.${message.guild.id}.prefix`, '!');

		const prefix = client.data.get(`guild.${message.guild.id}.prefix`);
		if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) {
			const embed = new MessageEmbed()
				.setTitle('Hey! I\'m Eider!')
				.setDescription(`My prefix in this guild is currently \`${prefix}\``)
				.setColor('BLURPLE')
				.setThumbnail('https://cdn.discordapp.com/attachments/858855894204678206/874231112686247956/eider-animate.gif');
			message.channel.send({ embeds: [ embed ] });
		}
	},
};