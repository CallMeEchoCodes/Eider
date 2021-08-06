module.exports = {
	name: 'ready',
	execute(client) {
		console.log(`Logged in as ${client.user.tag} 🚀!`);
		client.user.setActivity('!help to view commands (when i add it)');
	},
};