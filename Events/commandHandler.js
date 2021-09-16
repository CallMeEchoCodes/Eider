const { Logger } = require('../Utilities/Logger')

module.exports = class {
  constructor (client) {
    this.client = client
    this.trigger = 'on'
    this.type = 'interactionCreate'
  }

  async run (interaction) {
    if (!interaction.isCommand()) return

    const command = this.client.commands.get(interaction.commandName)

    if (!command) return await interaction.reply({ content: 'There was an error while executing that command!', ephemeral: true })

    if (command.conf.guildOnly === true && !interaction.guild) return await interaction.reply({ content: 'That command can only be used in a guild!', ephemeral: true })

    if (!interaction.member.permissions.has(command.conf.permissions)) return await interaction.reply({ content: 'You don\'t have permission to use that command!', ephemeral: true })

    try {
      command.run(this.client, interaction)
    } catch (err) {
      Logger.log(err, 'error')
      interaction.client.users.cache.get(interaction.client.config.owner).send(`<@${interaction.client.users.cache.get(interaction.client.config.owner).id}>\nAn Error occurred when ${interaction.user.tag} ran /${interaction.commandName}. The error was as follows: \n${err}\n Check the logs for full interaction details`)
      await interaction.reply({ content: 'There was an error while executing that command!', ephemeral: true })
      return Logger.log(JSON.stringify(interaction), 'debug')
    }
  }
}
