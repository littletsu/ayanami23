import fetch from 'node-fetch';

import ActionRow from '../utils/components/ActionRow.js';
import Button from '../utils/components/Button.js';

const necoArc = "https://m.media-amazon.com/images/I/41CSHQ1Y6RL._AC_.jpg";

let necoArcChance = 0;

const getImg = async () => {
  if(necoArcChance === 3) {
    necoArcChance = 0;
    if(Math.floor(Math.random() * 2)) {
      return necoArc;
    }
  }
  try {
    let req = await fetch(`http://aws.random.cat/meow`);
    let json = (await req.text())
    return eval(`necoArcChance++; "${json.split("file")[1].split('"')[2]}"`);
  } catch(e) {
    return (await getImg());
  }
}

const randomButton = new Button("Random", "random", "🔄");
const actionRow = new ActionRow(randomButton).toObject();
const interactionCallback = async interaction => {
  interaction.editParent((await getImg()));
}

export default {
  name: 'gato',
  aliases: ['cat', 'minino', 'gatito'],
  category: global.Categories.fun,
  restricted: false,
  description: 'Obten una imagen de un gato al azar!',
  usage: '',
  
  run: async (client, msg, args) => {
    const catURL = await getImg();
    
    const catMsg = await client.createMessage(msg.channel.id, {
      content: catURL,
      components: [actionRow]
    });
    client.componentCallbacks.set(catMsg.id, interactionCallback);
  }
}