import Embed from '../utils/embed.js';

export default {
  name: 'help',
  aliases: ['cmds', 'commands', 'comandos'],
  category: global.Categories.basics,
  restricted: false,
  usage: '(opcional: comando)',
  description: 'Obten una lista de todos los comandos.', 
  
  run: (client, msg, args) => {

    if(args[0]) {
      let cmd = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
      if(cmd.category == null) return;
      let restricted = cmd.restricted ? "Activada" : "Desactivada";
      let category = cmd.category.slice(3, cmd.category.length-1);
      let aliases = cmd.aliases.length > 0 ? `\nSobrenombres: ${cmd.aliases.join(' | ')}` : ``;
      client.quickEmbed(msg.channel.id, `Nombre: ${cmd.name}\nDescripción: ${cmd.description}${aliases}\nCategoria: ${category}\nRestrición: ${restricted}`, `RANDOM`)
    } else {
      const helpEmbed = new Embed();
      helpEmbed.randomColor();
      Object.entries(global.Categories).forEach(category => {
        let field = client.commands.filter(cmd => cmd.category == category[1])
          .map(cmd => `\`${client.prefix}${cmd.name}\` - \`${cmd.description}\``).join('\n\n') || "No hay comandos en esta categoria.";
        helpEmbed.pushField(category[1], field, true);
      })
      
      helpEmbed.thumbnail.url = client.user.avatarURL;
    
      client.createMessage(msg.channel.id, {embeds: [helpEmbed.toObject()]});
    }
    
  }
};