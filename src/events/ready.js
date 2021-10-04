const owo = () => String.fromCharCode(Math.floor(Math.random() * ( 0x7E - 0x21)) );
const awa = () => {
  let nwn = owo();
  return `${nwn}w${nwn}`;
}
export default (client) => {
  let randomChar = awa();
  const setPresence = (pwp) => {
    client.editStatus("online", {
    name: "al maau " + pwp,
    type: 3
  })
  }
  console.log(`
${randomChar}`);
  setPresence(randomChar)
  setInterval(() => setPresence(awa()), 10000)
  client.createMessage('887459519121223800', `Started at ${new Date().toString()} - ${randomChar}`);
}