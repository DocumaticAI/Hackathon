const { messages, server } = require('./server');

const guildM = require("./models/guilds.js")



const userM = require("./models/user.js")

const socket = require('socket.io');

const got = require('got');

const { toHTML } = require('discord-markdown');

const { textEmoji } = require('markdown-to-text-emoji'); 

const metascraper = require('metascraper')([

  require('metascraper-description')(),

  require('metascraper-image')(),

  require('metascraper-title')(),

  require('metascraper-url')()

]);

const io = socket(server);

io.on('connection', (clientSocket) => {
    
    clientSocket.guildM = guildM;
    clientSocket.userM = userM;

  console.log('Made socket connection', clientSocket.id);
    
    clientSocket.on("userConnect", async id => {
        let user = await userM.findOne({ id: id }, { _id: false })
        if(!user) return
        await userM.findOneAndUpdate({ id: id }, {$set: { status: "online" }})
        
        clientSocket.userId = id;
        
        console.log(id + " " + clientSocket.userId + " has connected!")
        
        io.sockets.emit("user", { id: id, status: "online" })
    })
    
    clientSocket.on("disconnect", async () => {
        let user = await userM.findOne({ id: clientSocket.userId }, { _id: false })
        if(!user) return
        await userM.findOneAndUpdate({ id: clientSocket.userId }, {$set: { status: "offline" }})
        
        console.log(clientSocket.userId + " got offline")
        
        io.sockets.emit("user", { id: clientSocket.id, status: "offline" })
    })
    
    clientSocket.on('chat', async (data) => {
        
    let guild = await guildM.findOne({ id: data.guildId }, { _id: false })

    

    if(!guild) return
        

    let user = await userM.findOne({ id: data.userId }, { _id: false })

    

    if(!user) return
        
        await setEmbed(data);

    data.html = toHTML(textEmoji(data.message));
        
        let adata = {

        id: makeID(35).toString(),

        content: data.message,

        userId: data.userId,

        edited: false,

        channel: data.channelId,

        date: Date.now(),

        embed: (data.embed ? data.embed : null),

        html: data.html,

        username: user.username,

        avatar: user.avatar,

    }


    await guildM.findOneAndUpdate({ id: data.guildId }, {
 $push : {
    messages :  adata
 }
})
        
        io.sockets.emit("make-chat", adata)

    })

  /*clientSocket.on('chat', async (data) => {

    await setEmbed(data);

    data.html = toHTML(textEmoji(data.message));

    const newIndex = messages.push(data) - 1;

    setTimeout(() => messages.splice(newIndex, 1), 5 * 60 * 1000);

    

    io.sockets.emit('chat', data);

  });
*/
  clientSocket.on('typing', (data) => {

    io.sockets.emit('typing', data);

  });
    
    clientSocket.on("msgEdit", async (data) => {
        
        await setEmbed(data);

    data.html = toHTML(textEmoji(data.message));
        
        await guildM.findOneAndUpdate({ id: data.gId, "messages.id": data.messageId },{$set: { "messages.$.content": data.message, "messages.$.html": data.html, "messages.$.embed": data.embed, "messages.$.edited": true }})
    
    
    io.sockets.emit("msgEditSuccess", {
        messageId: data.messageId
    })
        })

});
    
    

function makeID(length) {

    var result = '';

    var characters = '1234567890';

    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {

        result += characters.charAt(Math.floor(Math.random() * charactersLength));

    }

    return result;

}

async function setEmbed(data) {

  const containsURL = /([https://].*)/.test(data.message);

  if (containsURL) {

    try {

      const targetUrl = /([https://].*)/.exec(data.message)[0];

      const { body: html, url } = await got(targetUrl).catch(e => null)

      data.embed = await metascraper({ html, url }).catch(e => null)

    } catch {}

  }

}