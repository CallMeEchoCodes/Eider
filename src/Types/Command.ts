import type { SlashCommandBuilder } from '@discordjs/builders'
import type { PermissionResolvable } from 'discord.js'

export type Command = {
  data: SlashCommandBuilder
  guildonly: boolean
  permissions: PermissionResolvable[]
  cooldown?: number
  run: Function
}
