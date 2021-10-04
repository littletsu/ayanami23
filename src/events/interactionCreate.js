export default (client, interaction) => {
  let component_type = interaction.data?.component_type;
  if(component_type) {
     if(client.componentCallbacks.has(interaction.message.id)) {
       client.componentCallbacks.get(interaction.message.id)(interaction);
     }
  }
}