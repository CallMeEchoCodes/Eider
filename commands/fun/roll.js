module.exports = {
	name: 'roll',
	description: 'Pick a number between x and y',
	cooldown: 2,
	args: 2,
	usage: 'roll <min> <max>',
	async execute(message, args) {
		args.forEach((item)=>{args[args.indexOf(item)] = parseInt(item);});
		if (!args[1]) return message.reply('I Need A Second Number!');
		if (!Number.isInteger(args[0]) || !Number.isInteger(args[1])) return message.reply('At least one of your inputs were not a number!');
		const number = Math.floor(Math.random() * (Math.floor(args[0]) - Math.ceil(args[1]))) + Math.ceil(args[1]);
		message.channel.send(`It's ${number}!`);
	},
};