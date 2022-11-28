const { Command, PermissionFlagsBits } = require('../../bot')

class Skip extends Command {
  constructor(client) {
    super(client, {
      name: 'skip',
      description: "Change the song in the music player",
      aliases: ['skip'],

      clientPermissions: PermissionFlagsBits.Connect | PermissionFlagsBits.Speak,
      memberPermissions: PermissionFlagsBits.Connect | PermissionFlagsBits.Speak,
    })
  }

  async run () {
    if (!this.client.lavalink) {
      return this.interaction.reply({
        embeds: [{
          description: `⛔ Lavalink is not ready`
        }],
        ephemeral: true
      })
    }

    let player = this.client.players.get(this.interaction.member.guild.id)

    if (!player) {
      return this.interaction.reply({
        embeds: [{
          description: `⛔ There is no music player in this guild`
        }],
        ephemeral: true
      })
    }

    const voiceChannel = this.interaction.member.voice.channel

    if (player.queue.voiceChannel !== voiceChannel) {
      return this.interaction.reply({
        embeds: [{
          description: `⛔ Music player is busy, you can listen on **${voiceChannel}** channel`
        }],
        ephemeral: true
      })
    }

    await player.queue.start()

    if (this.interaction.isButton())
      await this.interaction.deferUpdate().catch((err) => console.error(err))
    else {
      this.interaction.reply({
        embeds: [{
          description: `🎵 Music has been skipped`
        }],
        ephemeral: true
      })
    }

  }
}

module.exports = Skip
