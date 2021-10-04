export default (client, msg) => {
  if (msg.author.bot) return;
  if (msg.channel.type == "dm") return;
  if (!msg.content.toLowerCase().startsWith(client.prefix)) return;
  let command = msg.content
    .split(" ")[0]
    .slice(client.prefix.length)
    .toLowerCase();
  let args = msg.content.split(" ").slice(1);
  if (!command) return;
  let cmd;
  try {
    if (client.commands.has(command)) {
      cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    }
    if(!cmd) return;
    if (cmd.restricted == true) {
      if (client.DEV_IDS.indexOf(msg.author.id) == -1) return client.createMessage(
          msg.channel.id,
          ":warning: Lo sentimos, pero este comando es solo para desarolladores.");
    }
  
    cmd.run(client, msg, args);
  } catch (error) {
    console.warn(error);
  }
}