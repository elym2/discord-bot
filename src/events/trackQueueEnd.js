const { Event } = require('../bot')

class TrackQueueEnd extends Event {
  constructor(client) {
    super(client, {
      name: 'trackQueueEnd',
      description: 'Lavalink player track queue end event',
    })
  }

  async run(interactionChannel) {
    await interactionChannel.send({
      embeds: [
        {
          description: `🎵 Queue ended`,
        },
      ],
      ephemeral: false,
    })
  }
}

module.exports = TrackQueueEnd
