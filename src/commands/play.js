import ytdl from 'ytdl-core';
import search from 'yt-search';
import moment from 'moment';

moment.locale('es')

import ActionRow from '../utils/components/ActionRow.js';
import SelectMenu from '../utils/components/SelectMenu.js';
import SelectOption from '../utils/components/SelectOption.js';

const play = async (client, data, msgMethod) => {
  msgMethod(`Ahora reproduciendo: ${data.queue[0].songTitle}\nPedido por: ${data.queue[0].requester}\nDuración aproximada: ${data.queue[0].duration}`)
  await data.connection.play(ytdl(data.queue[0].url, {filter: 'audioonly'}))
  
  data.connection.once('end', () => {
    finish(client, data, msgMethod);
  })
}

const finish = async(client, data, msgMethod) => {
  let guildQueue = client.queue.get(data.guildID)
  data.queue.shift();
  if(data.queue.length > 0) {
    client.queue.set(data.guildID, guildQueue);
    play(client, guildQueue, content => client.createMessage(guildQueue.queue[0].announceChannel, content));
  } else {
    client.queue.delete(data.guildID);
    client.guilds.get(data.guildID).leaveVoiceChannel();
    client.createMessage(data.announceChannel, 'Ya no hay mas canciones para reproducir!')
  }
}

export default {
  name: 'play',
  aliases: ['p'],
  category: global.Categories.music,
  restricted: false,
  usage: '<usage>',
  description: 'test description', 
  
  run: async (client, msg, args) => {
    const voiceID = msg.member.voiceState.channelID;
    const argsUrl = args[0];
    if(!voiceID) return msg.channel.createMessage('Necesitas unirte a un canal de voz antes de usar este comando!');
    if(!argsUrl) return msg.channel.createMessage('Por favor introduce un termino de busqueda o un URL valido de youtube!');
    
    const queueURL = async (url, interaction=null) => {
      let msgMethod = interaction ? (edit) => interaction.editParent({content: edit, components: []}) : (content) => msg.channel.createMessage({content, components: []});
      let info = await ytdl.getInfo(url);
      let data = client.queue.get(msg.guildID) || {};  

      if(!data.connection) data.connection = await client.joinVoiceChannel(voiceID);

      if(!data.queue) data.queue = [];

      data.guildID = msg.guildID;
      data.announceChannel = msg.channel.id;

      msg.author.tag = `${msg.author.username}#${msg.author.discriminator}`;

      data.queue.push({
        songTitle: info.videoDetails.title,
        requester: msg.author.tag,
        url,
        announceChannel: msg.channel.id,
        duration: moment.duration(parseInt(info.videoDetails.lengthSeconds), "seconds").humanize(),
      })

      if(!data.connection.playing) play(client, data, msgMethod);
      else msgMethod('Añadido a la lista: ' + info.videoDetails.title + `\nPedido por: ${msg.author.tag}\nCanciones antes para reproducir esta cancion: ${data.queue.length-1}`);
      if(interaction) client.componentCallbacks.remove(interaction.message.id);
      client.queue.set(msg.guildID, data);
    }
    
    
    if(!(await ytdl.validateURL(argsUrl))) {
      msg.channel.sendTyping();
      search(args.join(' '), async (err, res) => {
        if(err) return msg.channel.createMessage(`Algo salio mal... ${err}`);
        const videos = res.videos.slice(0, 10);
        const videoOptions = [];
        videos.forEach((video, i) => {
          videoOptions.push(new SelectOption(video.title, video.url, `Subido por ${video.author.name} - ${video.timestamp}`));
        })
        
        const searchMenu = new SelectMenu('search_menu', 'Selecciona un resultado', videoOptions);
        const searchActionRow = new ActionRow(searchMenu);
        // o reacciona con :one: para elegir el primer resultado
        const searchMsg = await msg.channel.createMessage({content: 'Selecciona un resultado', components: [searchActionRow.toObject()]});
        
        client.componentCallbacks.set(searchMsg.id, async interaction => {
          if(interaction.member.id == msg.member.id) queueURL(interaction.data.values[0], interaction);
          else {
            await interaction.defer(64);
            await interaction.createFollowup('No puedes interactuar con esto.');
          }
        })
      })
      return;
    } else queueURL(argsUrl);

  }
};