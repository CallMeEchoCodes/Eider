const { Bot } = require('./Structures/Client')

const Client = new Bot()

Client.login(Client.config.token)
