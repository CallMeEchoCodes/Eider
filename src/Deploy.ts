import { readdirSync } from 'fs'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { clientID, token } from './config.json'
import { Logger } from 'tslog'

const Log = new Logger()

const commands = []
  .map(command => command.toJSON())

const commandFolders = readdirSync('./Commands')

for (const folder of commandFolders) {
  if (folder.endsWith('.js')) {
    Log.warn(`Command ${folder} is not in a subdirectory! It has been ignored, please move it.`)
    continue
  }

  if (folder.endsWith('.map')) continue
  const commandFiles = readdirSync(`./Commands/${folder}`).filter(file => file.endsWith('.js'))
  for (const file of commandFiles) {
    const command = require(`./Commands/${folder}/${file}`)
    commands.push(command.data.toJSON())
    Log.info(`Deployed command ${file}`)
  }
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    await rest.put(
      Routes.applicationCommands(clientID),
      { body: commands }
    )

    Log.info('Successfully registered application commands.')
  } catch (error) {
    Log.error(error)
  }
})()
