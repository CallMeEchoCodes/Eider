const Command = require('../../Structures/Command')
const { MessageEmbed, Permissions } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

class Unban extends Command {
  constructor (client) {
    const commandBuilder = new SlashCommandBuilder()
      .setName('unban')
      .setDescription('Unbans a banned user.')
      .addStringOption(option =>
        option.setName('user')
          .setDescription('The user to unban')
          .setRequired(true))
      .addStringOption(option =>
        option.setName('reason')
          .setDescription('Why you are unbanning the user (will be set to "None Provided" if not provided)')
          .setRequired(false))
    const options = {
      guildonly: true,
      permissions: Permissions.FLAGS.BAN_MEMBERS
    }
    super(client, commandBuilder, options)

    this.data = commandBuilder
  }

  async run (client, interaction) {
    const user = interaction.options.getString('user')

    let reason = 'No reason provided'

    if (interaction.options.getString('reason')) reason = interaction.options.getString('reason')

    await interaction.guild.members.unban(user, reason).catch(e => {
      return interaction.reply({ content: 'An error occurred while unbaning that user!', ephemeral: true })
    })

    const unbanusr = await client.users.fetch(user)

    const banembed = new MessageEmbed()
      .setTitle('Member unbanned')
      .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
      .addField(unbanusr.tag, 'was unbanned')
      .addField('Moderator', interaction.user.tag)
      .addField('Reason', reason)
      .setColor('GREEN')
      .setThumbnail(unbanusr.displayAvatarURL({ dynamic: true }))
    await interaction.reply({ embeds: [banembed] })
    try { await unbanusr.send(banembed) } catch { interaction.channel.send('The user could not receive any details about this in DMs.') }
  }
}

module.exports = Unban
