let {Client, Intents} = require("discord.js")
let client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES]})
const express = require('express')
const { copyFileSync } = require("fs")
const app = express()
const port = 3000
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    app.get('/v1/:id', async (req, res) => {
    let data = []
  const guild = await client.guilds.cache.get("960209618561302558")
         const user = await guild.members.cache.get(req.params.id)
        try{
          user.presence?.activities.forEach(m => {
            let large
            let details
  let small
  let largetext
  let smallText
  let state
            if (m.assets) {
              if (m.assets.smallImageURL()) {
                small = m.assets.smallImageURL()
              }
              if (m.assets.largeText) {
                largetext = m.assets.largeText
              }
              if (m.assets.smallText) {
                smallText = m.assets.smallText
              }
              if (m.assets.largeImageURL()) {
                large = m.assets.largeImageURL()
              }
            }
            if (m.state) {
              state = m.state
            }
             if ( m.details) {
              details = m.details
            }  
            data.push({name: m.name, type: m.type, details: details,state: state, large: large, small: small, largetext: largetext, smalltext: smallText})
          })
        }catch(e){}
          
      
    res.send(data)
     
    })
  });

  app.get("/", async (req, res) =>{
    res.sendFile(__dirname + "/index.html")
  })
client.on("messageCreate", async message =>{
    message.channel.send(`User's status is: ${message.user.activities}`);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


client.login("token")
