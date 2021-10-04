import Embed from '../utils/embed.js';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import { inspect } from 'util';

export default {
  name: 'eval',
  aliases: ['e'],
  category: null,
  restricted: true,
  usage: '<usage>',
  description: 'test description', 
  
  run: async (client, msg, args) => {
    const evalEmbed = new Embed();
    if(args[0] == '--async') {
      args[0] = '(async () => {\n\t'
      args.push('\n})()');
    }
    let code = args.join(" ");
    
    try {
      let evaled = await eval(code);
      
      if(typeof evaled !== "string")
        evaled = inspect(evaled);
      
      if(evaled.length > 1000) {
        client.createMessage(msg.channel.id, 'El resultado fue muy largo.', {
            name: "evaled.js",
            file: Buffer.from(evaled, 'utf8')
        });
        return
      }
      
      evalEmbed.color = 0x42f468;
      evalEmbed.pushField(":arrow_right: Codigo a ejecutar: ", `\`\`\`js\n${code}\n\`\`\``);
      evalEmbed.pushField(":arrow_left: Resultado: ", `\`\`\`xl\n${evaled}\n\`\`\``);
    } catch(err) {
      evalEmbed.color = 0xff0000;
      evalEmbed.pushField(":arrow_right: Codigo a ejecutar: ", `\`\`\`js\n${code}\n\`\`\``);
      evalEmbed.pushField("Oops! Hubo un error al ejecutar el codigo!", `\`\`\`xl\n${err}\n\`\`\``);
      
    }
    client.createMessage(msg.channel.id, {
        embeds: [evalEmbed.toObject()]
    })
  }
};