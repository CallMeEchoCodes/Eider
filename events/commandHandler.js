const { Collection } = require('discord.js');

module.exports = {
	name: 'message',
	on: true,
	execute(client, message) {
		client.data.ensure(`guild.${message.guild.id}.prefix`, '!');

		const prefix = client.data.get(`guild.${message.guild.id}.prefix`);

		if (!message.content.startsWith(prefix) || message.author.bot) return;
		const args = message.content.slice(prefix.length).split(/ +/);
		const commandName = args.shift().toLowerCase();

		const command = client.commands.get(commandName)
			|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		if (!command) return;

		const { cooldowns } = client;
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Collection());
		}
		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 0.5) * 1000;
		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.channel.send(`\`${prefix + commandName}\` on cooldown for ${timeLeft.toFixed(1)} more second(s)`).then(x => {x.delete({ timeout:3000 });});
			}
		}
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		if (command.args && !args.length) return message.channel.send('This command requires args!');

		try {
			command.execute(client, message, args);
		} catch (error) {
			console.error(error);
		}
	},
};