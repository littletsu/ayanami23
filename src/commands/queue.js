export default {
  name: 'queue',
  aliases: ['q'],
  category: global.Categories.music,
  restricted: false,
  usage: '',
  description: 'Ve que canción se esta reproduciendo ahora y que canciones seguiran de ahí.',

  
  run: (client, msg, args) => {
    let fetched = client.queue.get(msg.guildID);

    if (!fetched) return msg.channel.createMessage('No hay ninguna canción reproduciendose ahora mismo!');

    let queue = fetched.queue;

    let nowPlaying = queue[0];

    let resp = `__**Ahora reproduciendo: **__\n**${nowPlaying.songTitle}** -- **Pedido por:** *${nowPlaying.requester}* -- **Duración aproximada:** *${nowPlaying.duration}*\n\n__**Lista de canciones:**__\n`;
    if(queue.length <= 1) resp += `No hay más canciones!`
    else {
      for (var i=1; i < queue.length; i++) {
        resp += `${i}. **${queue[i].songTitle}** -- **Pedido por:** *${queue[i].requester}* -- **Duración aproximada:** *${queue[i].duration}*\n`;
      }
    }
    msg.channel.createMessage(resp);
  }
};