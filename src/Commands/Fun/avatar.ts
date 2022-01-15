import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import type { CommandInteraction } from 'discord.js'
import type { Command } from '../../Types/Command'
import type { Bot } from '../../Structures/Client'
import Vibrant from 'node-vibrant'

const Avatar: Command = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Get a users avatar')
    .addUserOption(option =>
      option.setName('user')
        .setRequired(false)
        .setDescription('The user whos profile picture i should grab. (if not provided it will grab your own)')
    ),

  async run (Client: Bot, Interaction: CommandInteraction): Promise<void> {
    try {
      let jpeg = null
      let png = null
      let webp = null
      let embed = null
      let row = null
      let color = null
      if (!Interaction.options.getMember('user')) {
        color = await Vibrant.from(Interaction.user.displayAvatarURL({ format: 'png', size: 1024 })).getPalette()
        jpeg = Interaction.user.displayAvatarURL({ format: 'jpeg', dynamic: true, size: 1024 })
        png = Interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
        webp = Interaction.user.displayAvatarURL({ format: 'webp', dynamic: true, size: 1024 })
        row = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setStyle('LINK')
              .setURL(jpeg)
              .setLabel('Download as JPEG'),
            new MessageButton()
              .setStyle('LINK')
              .setURL(png)
              .setLabel('Download as PNG'),
            new MessageButton()
              .setStyle('LINK')
              .setURL(webp)
              .setLabel('Download as Webp'))
        embed = new MessageEmbed()
          .setTitle(`Avatar of ${Interaction.user.username}`)
          .setColor(color.Vibrant.hex)
          .setImage(png)
          .setURL(png)
      } else {
        color = await Vibrant.from(Interaction.options.getUser('user').displayAvatarURL({ format: 'png', size: 1024 })).getPalette()
        const rawLink = Interaction.options.getUser('user').displayAvatarURL()
        jpeg = rawLink.slice(0, 86) + '.jpg?size=1024'
        png = rawLink.slice(0, 86) + '.png?size=1024'
        webp = rawLink.slice(0, 86) + '.webp?size=1024'

        row = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setStyle('LINK')
              .setURL(jpeg)
              .setLabel('Download as JPEG'),
            new MessageButton()
              .setStyle('LINK')
              .setURL(png)
              .setLabel('Download as PNG'),
            new MessageButton()
              .setStyle('LINK')
              .setURL(webp)
              .setLabel('Download as Webp'))
        embed = new MessageEmbed()
          .setTitle(`Avatar of ${Interaction.options.getUser('user').username}`)
          .addField('Download as', '[jpeg](' + jpeg + ') | [png](' + png + ') | [webp](' + webp + ')')
          .setColor(color.Vibrant.hex)
          .setImage(png)
          .setURL(png)
      }
      Interaction.reply({ embeds: [embed], components: [row] })
    } catch (error) {
      return await Interaction.reply('An error occurred!')
    }
  }
}

module.exports = Avatar
