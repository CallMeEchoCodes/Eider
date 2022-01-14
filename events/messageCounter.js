module.exports = {
	name:'messageCreate',
	execute(client) {
		if (!client.data.get('msgCounterTotal')) client.data.set('msgCounterTotal', 0);
		try {
			client.data.set('msgCounterTotal', parseInt(client.data.get('msgCounterTotal')) + 1);
		} catch (err) {
			console.log('Can no longer store messages!');
		}
	},
};