import Embed from '../utils/embed.js';

import ActionRow from '../utils/components/ActionRow.js';
import Button from '../utils/components/Button.js';

import pinguinos from '../json/pinguinos.json';

const getRandom = () => Math.floor(Math.random() * pinguinos.length);


const navPButton = new Button('Anterior', 'prev', '◀️');
const navNButton = new Button('Siguiente', 'next', '▶️');
const navRButton = new Button('Random', 'random', '🔄');
const navActionRow = new ActionRow(navPButton, navNButton, navRButton).toObject();

export default {
  name: 'pinguino',
  aliases: ['pg'],
  category: global.Categories.fun,
  restricted: false,
  usage: '',
  description: 'Obten un pingüino al azar. (Atención: Puede contener palabras malsonantes. xd)', 
  
  run: async (client, msg, args) => {
    const pinguinoEmbed = new Embed();
    pinguinoEmbed.randomColor();
    
    let randomNumber = getRandom();
    
    const setEmbedProps = () => {
      let pinguino = pinguinos[randomNumber];
      pinguinoEmbed.author.name = pinguino.title;
      pinguinoEmbed.author.icon_url = 'https://pbs.twimg.com/profile_images/790309156565549056/iBLKFGf9_400x400.jpg';
      
      pinguinoEmbed.image.url = pinguino.url;
      
      pinguinoEmbed.footer.text = `Gracias a región elite (${randomNumber}/${pinguinos.length-1})`;
    }
    
    setEmbedProps();
    
    const pinguinoMsg = await client.createMessage(msg.channel.id, {
      embeds: [pinguinoEmbed.toObject()],
      components: [navActionRow]
    })
    
    client.componentCallbacks.set(pinguinoMsg.id, async i => {
      switch(i.data.custom_id) {
          case "next":
            if(randomNumber >= pinguinos.length-1) return await i.editParent({ content: "Llegaste al limite!", embeds: [pinguinoEmbed], components: [navActionRow] });
            randomNumber++
            setEmbedProps()
            await i.editParent({ content: "Siguiente Imagen", embeds: [pinguinoEmbed], components: [navActionRow] });
            break;
          case "prev":
            if(randomNumber <= 0) return await i.editParent({ content: "Llegaste al limite!", embeds: [pinguinoEmbed], components: [navActionRow] });

            randomNumber--
            setEmbedProps()
            await i.editParent({ content: "Imagen Anterior", embeds: [pinguinoEmbed], components: [navActionRow] });
            break;
          case "random":
            randomNumber = getRandom();
            setEmbedProps()
            await i.editParent({ content: "Imagen Random", embeds: [pinguinoEmbed], components: [navActionRow] });
            break;
      }
    })
    
  }
};