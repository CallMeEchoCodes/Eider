module.exports = {
	name: 'roll',
	description: 'Pick a number between x and y',
	cooldown: '2',
	args: true,
	async execute(client, message, args) {
		const number = Math.floor(Math.random() * (args[0] - args[1])) + args[1];
		message.channel.send(`It's ${number}!`);
	},
};