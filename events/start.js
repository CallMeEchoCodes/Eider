module.exports = {
	name: 'ready',
	once: 'true',
	async execute(client) {
		client.user.setPresence({
			status: 'online',
			activity: {
				name: 'Eider Alpha - !help (When i add it)',
				type: 'PLAYING',
			},
		});

		console.log(`Logged in as ${client.user.tag} 🚀!`);
	},
};