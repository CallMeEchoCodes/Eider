const fs = require('fs')
const chalk = require('chalk')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { clientId, guildId, token } = require('./config.json')
const { Logger } = require('./Utilities/Logger')

const commands = []
  .map(command => command.toJSON())

const commandFolders = fs.readdirSync('./Commands')

for (const folder of commandFolders) {
  if (folder.endsWith('.js')) {
    Logger.log(`Command ${folder} is not in a subdirectory! It has been ignored, please move it.`, 'warn')
    continue
  }
  const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter(file => file.endsWith('.js'))
  for (const file of commandFiles) {
    const command = new (require(`./Commands/${folder}/${file}`))()
    commands.push(command.data.toJSON())
    Logger.log(`Deployed command ${chalk.green(file)}`, 'info')
  }
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    )

    Logger.log('Successfully registered application commands.', 'info')
  } catch (error) {
    Logger.log(error, 'error')
  }
})()
