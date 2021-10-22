import { SlashCommandBuilder } from '@discordjs/builders'
import axios from 'axios'
import { CommandInteraction, MessageEmbed } from 'discord.js'
import type { Command } from '../../Types/Command'
import type { Bot } from '../../Structures/Client'
import type { levelObj } from '../../Types/levelObj'

const GeometryDash: Command = {
  data: new SlashCommandBuilder()
    .setName('gd')
    .setDescription('Geometry Dash Stuff')
    .addSubcommand(subcommand =>
      subcommand
        .setName('level')
        .setDescription('Get a level by id')
        .addNumberOption(option => option.setName('levelid').setDescription('A level id to get info about').setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('search')
        .setDescription('Search for a level')
        .addStringOption(option => option.setName('searchterm').setDescription('What To Search For').setRequired(true))),
  cooldown: 10,

  async run (Client: Bot, Interaction: CommandInteraction): Promise<void> {
    if (Interaction.options.getSubcommand() === 'level') {
      Interaction.deferReply()
      const { data } = await axios.get(`https://gdbrowser.com/api/level/${Interaction.options.getNumber('levelid')}`)

      const response = data as levelObj

      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      if (`${data}` === '-1') {
        return void Interaction.reply('I couldnt find that level!')
      } else {
        let stars = null
        if (response.stars === 0) {
          stars = 'None'
        } else {
          stars = response.stars
        }
        const embed = new MessageEmbed()
          .setTitle(response.name)
          .setURL(`https://gdbrowser.com/${response.id}`)
          .setThumbnail(`https://gdbrowser.com/assets/difficulties/${response.difficultyFace}.png`)
          .addFields([
            {
              name: 'Description',
              value: response.description
            },
            {
              name: 'Stars  <:star:899124937258844171>',
              value: `${stars}`,
              inline: true
            },
            {
              name: 'Orbs  <:orbs:899125373365796866>',
              value: `${response.orbs}`,
              inline: true
            },

            {
              name: 'Diamonds  <:diamond:899129023211393034>',
              value: `${response.diamonds}`,
              inline: true
            },
            {
              name: 'Likes  <:like:899129216916946994>',
              value: `${response.likes}`,
              inline: true
            },
            {
              name: 'Downloads  <:download:899129800206192741>',
              value: `${response.downloads}`,
              inline: true
            },
            {
              name: 'Song  <:playsong:899130171876048928>',
              value: (response.customSong >= 1 ? `[${response.songName}](https://newgrounds.com/audio/listen/${response.songID}) by [${response.songAuthor}](https://${response.songAuthor}.newgrounds.com)` : `${response.songName} by [${response.songAuthor}](https://${response.songAuthor}.newgrounds.com)`),
              inline: true
            }
          ])
        Interaction.editReply({ embeds: [embed] })
      }
    } else if (Interaction.options.getSubcommand() === 'search') return await Interaction.reply({ content: 'Comming Soon', ephemeral: true })
  }
}
module.exports = GeometryDash
