export default {
  name: 'ping',
  aliases: [],
  category: global.Categories.utils,
  restricted: false,
  description: 'Obten el tiempo que tarda en responder el bot', 
  
  run: (client, msg, args) => {
    client.quickEmbed(msg.channel.id, msg.channel.guild.shard.latency + 'ms');
  }
};