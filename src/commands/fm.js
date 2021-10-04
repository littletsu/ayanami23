import Embed from '../utils/embed.js';

export default {
  name: 'fm',
  aliases: [],
  category: global.Categories.music,
  restricted: false,
  usage: '<username>',
  description: 'Hey does this place have a last.fm bot', 
  
  run: async (client, msg, args) => {
    if(!args[0]) return msg.channel.createMessage('Especifica un usuario');
    try {
      let track = await client.fmAPI.getUserListeningTrack(args[0]);
      if(track == null) return msg.channel.createMessage(args[0] + ' no esta escuchando nada.');
      let album = await client.fmAPI.getTrackAlbum(track);
      let artist = await client.fmAPI.getArtistImg(track.artist);
     
      let trackEmbed = new Embed();
      trackEmbed.randomColor();
      trackEmbed.author.name = `${args[0]} esta escuchando`;
      trackEmbed.author.icon_url = msg.author.avatarURL;
      trackEmbed.description = `${track.artist["#text"]} - ${track.name}`;
      trackEmbed.thumbnail.url = album ? `${album.imgUrl}` : artist ? artist : null;
      trackEmbed.footer.text = album ? `del albúm "${album.name}"` : null;
      trackEmbed.footer.icon_url = artist ? artist : null;
     
      msg.channel.createMessage({embeds: [trackEmbed.toObject()]});
    } catch(err) {
      console.log(err);
      msg.channel.createMessage('No se encontro el usuario o ocurrio un error.');
    }
  }
};