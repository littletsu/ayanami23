import { Client, Collection, Constants } from "eris";
import Embed from "./src/utils/embed.js";
import readjsdir from "./src/utils/readjsdir.js";
import AudioScrobblerAPI from './src/utils/fm/AudioScrobblerAPI.js';

global.Categories = {
  fun: "😆 Divertidos:",
  utils: "💼 Utiles:",
  music: "🎵 Música:",
  nsfw: "🔞 NSFW:",
  basics: "📦 Basicos:"
};

const client = new Client(process.env.TOKEN, {
  intents: [
    "guilds",
    "guildMembers",
    "guildEmojisAndStickers",
    "guildMessages",
    "guildVoiceStates"
  ]
});

client.DEV_IDS = ["266063988209483790"];
client.prefix = "ta!";

client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();

client.queue = new Collection();

client.componentCallbacks = new Collection();

client.fmAPI = new AudioScrobblerAPI({key: process.env.FM_KEY});

client.quickEmbed = (id, text, color) => {
  const quickEmb = new Embed(null, text, color);

  if(!color || color === 'RANDOM') quickEmb.randomColor();
  client.createMessage(id, {embeds: [quickEmb.toObject()]});
  return quickEmb;
}


readjsdir("./src/commands")
  .forEach(async f => {
    let cmd = (await import("./src/commands/" + f)).default;
    if (!cmd.name) cmd.name = f.split('.')[0];
    client.commands.set(cmd.name, cmd);
    cmd.aliases.forEach(alias => {
      client.aliases.set(alias, cmd.name);
    });
  });

readjsdir('./src/events').forEach(async f => {
  let ev = (await import("./src/events/" + f)).default;
  let run = ev.bind(null, client);
  client.on(f.split('.')[0], run);
})

client.connect();
