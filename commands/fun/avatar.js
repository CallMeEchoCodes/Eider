const discord = require('discord.js');
module.exports = {
	name: 'avatar',
	description: 'Get avatar of a user',
	aliases:['av', 'pfp'],
	execute(client, message, args) {
		let embed = '';
		if (!args[0]) {
			embed = new discord.MessageEmbed()
				.setTitle(`Avatar of ${message.author.username}`)
				.setColor('BLUE')
				.setImage(message.author.avatarURL({ dynamic:true }) + '?size=1024')
				.setURL(message.author.avatarURL({ dynamic:true }) + '?size=1024');
		}
		else {
			embed = new discord.MessageEmbed()
				.setTitle(`Avatar of ${message.mentions.users.first().username}`)
				.setColor('BLUE')
				.setImage(message.mentions.users.first().avatarURL({ dynamic:true }) + '?size=1024')
				.setURL(message.mentions.users.first().avatarURL({ dynamic:true }) + '?size=1024');
		}
		message.channel.send(embed);
	},
};