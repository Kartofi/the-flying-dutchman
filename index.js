let {Client, Intents} = require("discord.js")
let client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES]})
const express = require('express')
const { copyFileSync } = require("fs")
const app = express()
const port = 3000
const axios = require("axios")
const e = require("express")

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  var hDisplay = h > 0 ? h +":"  : "";
  var mDisplay = m > 0 ? m+":"  : "";
  var sDisplay = s > 0 ? s  : "";
  return hDisplay + mDisplay + sDisplay; 
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({ activities: [{ name: 'you.' , type: 'WATCHING'}] });

    app.get("/user/:id", async (req, res) => {
      res.header('Pragma', 'no-cache');
    res.header('Content-Type', 'image/svg+xml');
    res.header('Expires', '0');
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        let data = []
        const guild = await client.guilds.cache.get("960209618561302558")
        
      
               const user = await guild.members.cache.get(req.params.id)
      
              try{
                user.presence?.activities.forEach(m => {
                  if (m.type === "CUSTOM") return;
                  let large
                  let details
        let small
        let largetext
        let smallText
        let state
        let timestamps
                  if (m.assets) {
                    if (m.assets.smallImageURL()) {
                      small = m.assets.smallImageURL({ format: 'png', size: 2048, dynamic: true })
                    }
                    if (m.assets.largeText) {
                      largetext = m.assets.largeText
                    }
                    if (m.assets.smallText) {
                      smallText = m.assets.smallText
                    }
                    if (m.assets.largeImageURL()) {
                      large = m.assets.largeImageURL({ format: 'png', size: 2048, dynamic: true })
                    }
                  }
                  if (m.state) {
                    state = m.state
                  }
                   if ( m.details) {
                    details = m.details
                  }  
                  if (m.timestamps) {
                    timestamps = m.timestamps
                  }
                 
                  data.push({name: m.name, type: m.type, details: details,state: state, large: large, small: small, largetext: largetext, smalltext: smallText, timestamps:timestamps})
                })
              }catch(e){}
                
            const user_ = await client.users.cache.get(req.params.id)
            let flag
          let avatar_url
          
          if (!user_) {
            return
          }
            if (user_.avatarURL()){
                avatar_url = user_.avatarURL({ format: 'png', size: 2048, dynamic: true })
              }
              
              if ( user_.flags) {
                flags =  user_.flags.toArray()
              }
          
       
          let data__= [{avatar: avatar_url,status: user.presence?.status, name: user_.tag,badges: flags, id: user.id},data]
     
 
let color_status
if (data__[0].status == "dnd") {
color_status = "red"
}else if (data__[0].status == "idle") {
  color_status = "yellow"
}else if (data__[0].status == "offline") {
  color_status = "gray"
}else if (data__[0].status == "online") {
  color_status = "green"
}

        res.setHeader('Content-Type', 'image/svg+xml');
       let svg = `<svg   
       width="495"
       height="210"
               
       viewBox="0 0 495 210"
       
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
   
       <style>
text{
    font-size: 2em;

}

.presence{
    font-size: 1em;

}
       </style>
<rect xmlns="http://www.w3.org/2000/svg" data-testid="card-bg" x="0.5" y="0.5" rx="4.5" height="99%" stroke="#E4E2E2" width="349" fill="#141321" stroke-opacity="1"/>

<rect x="6" y="6" width="107" height="107" style="fill:`+ color_status +`" />

<image href="data:image/png;base64,` + Buffer.from((await axios.get(data__[0].avatar, {responseType: "arraybuffer", })).data,"utf-8").toString("base64") +`" x="10" y="10" height="100" width="100"/>
         <text x="120" y="50"  fill="white" >` + data__[0].name +`</text>
        
       `
    let index = 0
    
    data__[1].forEach(item => {
      if (item.name == "Visual Studio Code") {
       index = data__[1].indexOf(item)

      }
        
      
    })
       if (data__[1][index] ) {
        if (data__[1][index].large) {
            svg += `<text x="100" y="149" class="presence"  fill="white">⏳` + secondsToHms(-(data__[1][0].timestamps.start - new Date())/1000)+` elapsed</text>       <text x="100" y="130" class="presence"  fill="white">` + data__[1][index].name +`</text> <text class="presence" x="100" y="170"  fill="white">` + data__[1][index].state +`</text> <text x="100" y="190"  class="presence" fill="white">` + data__[1][index].details +`</text> <image href="data:image/png;base64,` +  Buffer.from((await axios.get(data__[1][index].large, {responseType: "arraybuffer", })).data,"utf-8").toString("base64") + `" x="10" y="125" height="75" width="75"/>`
        }
     
      
        
       }
       
       res.send(svg + "</svg>");
     
     })


  
  });

  app.get("/", async (req, res) =>{
    res.sendFile(__dirname + "/index.html")
  })



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


client.login("@")
