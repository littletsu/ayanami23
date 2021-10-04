export default {
  name: 'test',
  aliases: ['te', 'st'],
  category: null,
  restricted: false,
  usage: '<usage>',
  description: 'test description', 
  
  run: (client, msg, args) => {
    client.quickEmbed(msg.channel.id, 'test');
  }
};