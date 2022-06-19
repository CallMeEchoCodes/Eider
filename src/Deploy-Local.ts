import { readdirSync } from 'fs'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { clientID, guildID, token, production } from './config.json'
import Simpllog from 'simpllog'

const Log = new Simpllog({ production: production })

const commands = []
  .map(command => command.toJSON())

const commandFolders = readdirSync('./Commands')

for (const folder of commandFolders) {
  if (folder.endsWith('.js')) {
    Log.log(`Command ${folder} is not in a subdirectory! It has been ignored, please move it.`, 'WARN')
    continue
  }

  if (folder.endsWith('.map')) continue
  const commandFiles = readdirSync(`./Commands/${folder}`).filter(file => file.endsWith('.js'))
  for (const file of commandFiles) {
    const command = require(`./Commands/${folder}/${file}`)
    commands.push(command.data.toJSON())
    Log.log(`Deployed command ${file}`, 'INFO')
  }
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(clientID, guildID),
      { body: commands }
    )

    Log.log('Successfully registered application commands.', 'SUCCESS')
  } catch (error) {
    Log.log(error, 'ERROR')
  }
})()
