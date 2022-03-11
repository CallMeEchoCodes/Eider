import { SlashCommandBuilder } from '@discordjs/builders'
import { createCanvas } from 'canvas'
import { CommandInteraction, MessageAttachment } from 'discord.js'
import type { Command } from '../../Types/Command'
import type { Bot } from '../../Structures/Client'

const Convert: Command = {
  data: new SlashCommandBuilder()
    .setName('convert')
    .setDescription('Convert some value to another (eg Celsius to Fahrenheit)')
    .addSubcommand(command =>
      command.setName('c2f')
        .setDescription('Celsius to Fahrenheit')
        .addNumberOption(option =>
          option.setName('value')
            .setDescription('The value to convert to Fahrenheit')
            .setRequired(true)
        )
    )
    .addSubcommand(command =>
      command.setName('f2c')
        .setDescription('Fahrenheit to Celsius')
        .addNumberOption(option =>
          option.setName('value')
            .setDescription('The value to convert to Celsius')
            .setRequired(true)
        )
    )

    .addSubcommand(command =>
      command.setName('rgb2hex')
        .setDescription('RGB to Hex')
        .addNumberOption(option =>
          option.setName('r')
            .setDescription('The red value')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('g')
            .setDescription('The green value')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('b')
            .setDescription('The blue value')
            .setRequired(true)
        )
    )

    .addSubcommand(command =>
      command.setName('hex2rgb')
        .setDescription('Hex to RGB')
        .addStringOption(option =>
          option.setName('hex')
            .setDescription('The hex to convert')
            .setRequired(true)
        )
    ),

  async run (Client: Bot, Interaction: CommandInteraction): Promise<void> {
    if (Interaction.options.getSubcommand() === 'c2f') {
      await Interaction.reply(`That's ${(Interaction.options.getNumber('value') * 9 / 5) + 32}℉`)
    } else if (Interaction.options.getSubcommand() === 'f2c') {
      await Interaction.reply(`That's ${(Interaction.options.getNumber('value') - 32) * 5 / 9}℃`)
    } else if (Interaction.options.getSubcommand() === 'rgb2hex') {
      function decToHex (value: number): string {
        if (value > 255) {
          return 'FF'
        } else if (value < 0) {
          return '00'
        } else {
          return value.toString(16).padStart(2, '0').toUpperCase()
        }
      }
      const canvas = createCanvas(128, 128)
      const context = canvas.getContext('2d')
      context.fillStyle = `#${decToHex(Interaction.options.getNumber('r'))}${decToHex(Interaction.options.getNumber('g'))}${decToHex(Interaction.options.getNumber('b'))}`
      context.fillRect(0, 0, 128, 128)
      const buffer = canvas.toBuffer('image/png')
      const attachment = new MessageAttachment(buffer, 'color.png')
      await Interaction.reply({ content: `Thats \`#${decToHex(Interaction.options.getNumber('r'))}${decToHex(Interaction.options.getNumber('g'))}${decToHex(Interaction.options.getNumber('b'))}\``, files: [attachment] })
    } else if (Interaction.options.getSubcommand() === 'hex2rgb') {
      if (!/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(Interaction.options.getString('hex'))) return await Interaction.reply('Thats not a hex code!')

      const out = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(Interaction.options.getString('hex'))
      const result = {
        r: parseInt(out[1], 16),
        g: parseInt(out[2], 16),
        b: parseInt(out[3], 16)
      }

      const canvas = createCanvas(128, 128)
      const context = canvas.getContext('2d')
      context.fillStyle = Interaction.options.getString('hex')
      context.fillRect(0, 0, 128, 128)
      const buffer = canvas.toBuffer('image/png')
      const attachment = new MessageAttachment(buffer, 'color.png')
      await Interaction.reply({ content: `Thats \`${result.r}, ${result.g}, ${result.b}\``, files: [attachment] })
    }
  }
}

module.exports = Convert
