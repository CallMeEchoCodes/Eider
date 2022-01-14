import { SlashCommandBuilder } from '@discordjs/builders'
import axios from 'axios'
import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import type { CommandInteraction } from 'discord.js'
import type { Command } from '../../Types/Command'
import type { Bot } from '../../Structures/Client'

const Tweak: Command = {
  data: new SlashCommandBuilder()
    .setName('tweak')
    .setDescription('Search For A Jailbreak Tweak.')
    .addStringOption(option =>
      option.setName('query')
        .setDescription('What to search for')
        .setRequired(true)),

  async run (Client: Bot, Interaction: CommandInteraction): Promise<void> {
    type CanisterResponse = {
      status: string
      date: string
      data: Array<{ identifier: string
        name: string
        description: string
        packageIcon: string
        author: string
        latestVersion: string
        depiction: string
        section: string
        price: string
        repository: {uri: string
          name: string}
      }>
    }

    let author = 'null'
    const { data } = await axios.get(`https://api.canister.me/v1/community/packages/search?query=${Interaction.options.getString('query')}&searchFields=identifier,name,author,maintainer&responseFields=identifier,name,description,packageIcon,repository.uri,repository.name,author,latestVersion,depiction,section,price`)
    const res = data as CanisterResponse

    try { if (res.data[0].name === undefined || res.data[0].name === null) return await Interaction.reply({ content: 'Your search returned no results!', ephemeral: true }) } catch { return await Interaction.reply({ content: 'Something went wrong. Try again', ephemeral: true }) }
    if (res.data[0].author === null || res.data[0].author === undefined) { author = 'Unknown' } else { author = res.data[0].author }

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle('LINK')
          .setURL(res.data[0].depiction)
          .setEmoji('🔍')
          .setLabel('View Depiction'),
        new MessageButton()
          .setEmoji('931391570320715887')
          .setStyle('LINK')
          .setURL(`https://sharerepo.stkc.win/v2/?pkgman=cydia&repo=${res.data[0].repository.uri}`)
          .setLabel('Add Repo To Cydia'),
        new MessageButton()
          .setEmoji('931390952411660358')
          .setStyle('LINK')
          .setURL(`https://sharerepo.stkc.win/v2/?pkgman=sileo&repo=${res.data[0].repository.uri}`)
          .setLabel('Add Repo To Sileo'),
        new MessageButton()
          .setEmoji('931391570639478834')
          .setStyle('LINK')
          .setURL(`https://sharerepo.stkc.win/v2/?pkgman=zebra&repo=${res.data[0].repository.uri}`)
          .setLabel('Add Repo To Zebra'),
        new MessageButton()
          .setEmoji('931391570404573235')
          .setStyle('LINK')
          .setURL(`https://sharerepo.stkc.win/v2/?pkgman=installer&repo=${res.data[0].repository.uri}`)
          .setLabel('Add Repo To Installer')

      )

    const embed = new MessageEmbed()
      .setColor('BLURPLE')
      .setTitle(res.data[0].name)
      .setThumbnail(res.data[0].packageIcon || 'https://repo.packix.com/api/Packages/60bfb71987ca62001c6585e6/icon/download?size=medium&hash=2')
      .setDescription(res.data[0].description)
      .addField('Author', author, true)
      .addField('Version', res.data[0].latestVersion, true)
      .addField('Price', res.data[0].price, true)
      .addField('Repo', `[${res.data[0].repository.name}](${res.data[0].repository.uri})`, true)
      .addField('Bundle ID', res.data[0].identifier, true)
      .setFooter('Powered by Canister', 'https://cdn.discordapp.com/attachments/866173562120306699/931379303290142730/canister.png')
    await Interaction.reply({ embeds: [embed], components: [row] })
  }
}

module.exports = Tweak
