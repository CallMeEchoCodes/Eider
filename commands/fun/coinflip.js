module.exports = {
	name: 'coinflip',
	description: 'Flip A Coin!',
	cooldown: 2,
	usage: 'coinflip',
	aliases: [ 'flip', 'coin' ],
	async execute(message) {
		const flip = ['heads', 'tails'];
		const result = flip[Math.floor(Math.random() * flip.length)];

		message.channel.send(`It's ${result}!`);
	},
};