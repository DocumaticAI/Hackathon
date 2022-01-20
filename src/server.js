const express = require('express');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const mongoose = require("mongoose")
const userM = require("./models/user.js")
const guildM = require("./models/guilds.js")
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');
const path = require("path")

const got = require('got');

const { toHTML } = require('discord-markdown');

const { textEmoji } = require('markdown-to-text-emoji'); 

const metascraper = require('metascraper')([

  require('metascraper-description')(),

  require('metascraper-image')(),

  require('metascraper-title')(),

  require('metascraper-url')()

]);

const ejs = require("ejs");

  const bodyParser = require("body-parser");

const app = express();

const fetch = require("node-fetch")

app.use(cookieParser());


app.set('views', path.join(__dirname, '/views'));



app.use(session({

    secret : 'secret',

    resave : true,

    saveUninitialized : true

}));

app.use(passport.initialize());

app.use(passport.session());

app.use(flash());

app.use((req,res,next)=> {

    res.locals.success_msg = req.flash('success_msg');

    res.locals.error_msg = req.flash('error_msg');

    res.locals.error  = req.flash('error');

    next();

    })


passport.use(
        new LocalStrategy({usernameField: 'email'},(email,password,done)=>{
            //match user
            userM.findOne({email:email})
            .then((user)=>{
                if(!user){
                    return done(null,false,{message:'email not registered'});
                
                    }
                
                if(password !== user.password) return done(null,false,{message: 'password incorrect'});
                
                return done(null,user);
                
            })
            .catch((err)=>{console.log(err)})
        })
                
    )
    passport.serializeUser(function(user,done) {
        done(null,user.id);
    })
    passport.deserializeUser(function(id,done){
        userM.findOne({id: id},function(err,user){
            done(err,user);
        })
    })

const templateDir = path.resolve(`${process.cwd()}${path.sep}views`);

    app.use("/css", express.static(path.resolve(`${templateDir}${path.sep}css`)));

    app.use("/js", express.static(path.resolve(`${templateDir}${path.sep}js`)));

app.engine("ejs", ejs.renderFile);





    app.set("view engine", "ejs");

  

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({

      extended: true

    }));

const server = app.listen(1477,

  () => {
    console.log('Server listening on port 1477')
    
    

mongoose.connect('', {

        useNewUrlParser: true,

        useUnifiedTopology: true,

        useCreateIndex: true,

        useFindAndModify: false,

        autoIndex: false

    }).then(a => console.log("mongo connected")).catch(e => console.log(e))
            
    });

const checkAuth = function(req,res,next) {

        if(req.isAuthenticated()) {
            
            if(req.user.verified !== "yes") return res.send("Your email is not Verified!")

            return next();

        }

        //res.send('error_msg please login to view this resource');

        res.redirect('/login');

    }

app.get('/', async (req,res) => {
    
 if(req.isAuthenticated()) {
        return res.redirect(`/guild/BH16FgPBZWiTYCZL2U4pflJfu/m5vSuLRaIOPcb7QAzKEbhF5BnIvEMt`)
    } else {
        res.redirect("/login")
    }
})

app.get('/login',(req,res)=>{
    res.render('login.ejs');
})

app.get('/register',(req,res)=>{

    res.render('register.ejs');

})

app.post('/register', async (req,res,next) => {
    
    let { email, password, cpassword, username } = req.body;
    
    if(!email || !password || !cpassword || !username) return
    
    let checkuser = await userM.findOne({ email: email.toLowerCase() }, { _id: false })
    
    if(checkuser) return res.send({ error: true, message: "email exists!" })
    
    if(password !== cpassword) return res.send({ error: true, message: "passwords doesn't match!" })
    
    let verifyCode = makeToken(35)
    
    const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: '',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: '',
      to: email,
      subject: 'Rival Chat Email Verification',
      text: `verify your email - https://chat.only-fans.club/verify?token=${verifyCode}`,
      html: `verify your email - https://chat.only-fans.club/verify?token=${verifyCode}`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail().catch((error) => {
    return console.log(error.message)
    });
        
    let token = (makeToken(15) + "." + makeToken(15) + "." + makeToken(15) + "." + makeToken(15))
   
    const newUser = new userM({

		id: ("1"+makeID(19)),
            
        token: token,
    
        username: username,

        date: Date.now(),

        guilds: [],
    
        email: email,
    
        avatar: "https://media.discordapp.net/attachments/810879268296327198/924977810454511646/20211227_161733.png",
    
        password: password,
    
        badges: [],
    
        status: "OFFLINE",
    
        lastSeenMsgs: {},
        
        verified: "no",
        
        verifyCode: verifyCode

	})
    

                    newUser.save()
                        
                        await guildM.findOneAndUpdate({ id: "BH16FgPBZWiTYCZL2U4pflJfu" }, {

 $push : {

    members :  {

            id: newUser.id,

            roles: ["BH16FgPBZWiTYCZL2U4pflJfu"],

            nickname: username,

            avatar: newUser.avatar,

            joined: Date.now()

        }

 }

})

                        req.flash('success_msg','You have now registered... but check out your email for email Verification!');

   res.send('You have now registered... but check out your email for email Verification!');

   

                    

                      

                
        
    
    
     
})

app.get("/verify", async (req,res,next) => {
    if(!req.query || !req.query.token) return
    
    let user = await userM.findOne({ verifyCode: req.query.token }, { _id: false })
    
    if(!user) {
        return res.send({ error: true, message: "Verification code invalid" })
        } else {
            if(user.verified === "yes") return res.send({ error: true, message: "You are already verified!" })
            
            await userM.findOneAndUpdate({ verifyCode: req.query.token }, { verifyCode: null, verified: "yes" })
                                        await res.redirect("/login") 
        }
})

app.post('/login', async (req,res,next) => {
    passport.authenticate('local',{
    successRedirect : '/guild/BH16FgPBZWiTYCZL2U4pflJfu/m5vSuLRaIOPcb7QAzKEbhF5BnIvEMt',
    failureRedirect: '/login',
    failureFlash : true
})(req,res,next)
    
     
})


app.get('/finduser/:id', async (req,res) => {
    let user = await userM.findOne({ id: req.params.id })
    
    if(!user) return
    
    res.json(user)
})

app.post('/message/edit', async (req,res) => {
    let data = {};
    let { id, gid, user, message } = req.body;
    if(!id || !gid || !user || !message) return
    data.message = message

    data.html = await toHTML(textEmoji(message));

    await setEmbed(data);
    let auser = await userM.findOne({ token: user }, { _id: false })
    if(!auser) return
    
   
    
    
    setTimeout(async () => {
    
    await guildM.findOneAndUpdate({ id: gid, "messages.id": id},{$set:{"messages.$.content": message, "messages.$.html": data.html, "messages.$.embed": (data.embed ? data.embed : null), "messages.$.edited": true }}).then(e => console.log(e)).catch(e => console.log(e))
        }, 1000)
})

app.get("/guild/:gid/message/:id/delete", checkAuth, async (req,res) => {
    let guilds = await guildM.find()
    
        await guildM.findOneAndUpdate({ id: req.params.gid }, {$pull:{"messages":{"id":req.params.id}}},{multi:true})
        await res.redirect(req.query ? (req.query.url ? req.query.url : "/") : "/" )

})
  
app.get('/guild/:id/:cid', checkAuth, async (req,res) => {
    
    

   let guilds = await guildM.find()
   
    let guild = await guildM.findOne({ id: req.params.id }, { _id: false })
    
    if(!guild) return
    
    if(guild.members.filter(a => a.id === req.user.id).length !== 1) return
    
    let msgs = await (guild.messages || [])
    
    

    let uguilds = await (guilds.filter(a => (a.members || []).filter(b => b.id === req.user.id)))
    
    res.render("index.ejs", { req, msgs, guild, uguilds, nfetch: fetch })
})



app.get('/guild/:id/:cid/msgs', async (req,res) => {


    let guild = await guildM.findOne({ id: req.params.id }, { _id: false })

    

    if(!guild) return
    
    let msgs = (guild.messages.filter(a => a.channel === req.params.cid) || [])
    

    res.json(msgs)

})


app.get('/guilds/create', checkAuth, async (req,res) => {
    
    return
    
    let guild_id = makeID(25);
    let channel_id = makeID(30);
    
    new guildM({
        id: guild_id,
        name: "New Guild",
        date: Date.now(),
        icon: req.user.avatar,
        owner: req.user.id,
        messages: [],
        channels: [{
            id: channel_id,
            name: "general",
            category: null,
            type: "TEXT",
            summary: "text channel",
            lastMsg: null,
            date: Date.now()
        }],
        members: [{
            id: req.user.id,
            roles: [guild_id],
            nickname: req.user.username,
            avatar: req.user.avatar,
            joined: Date.now()
        }],
        roles: [{
            id: guild_id,
            color: "#D3D3D3",
            date: Date.now(),
            hoisted: false,
            mentionable: true,
            name: "@everyone",
            permissions: 0,
            position: 0
        }],
        verified: "no"
    }).save()
    
    return res.redirect(`/guild/${guild_id}/${channel_id}`)
})

const messages = [];

app.get('/messages', (req, res) => res.json(messages));


app.get('/users/:id', async (req,res) => {
    let user = await userM.findOne({ id: req.params.id }, { _id: false })
    
    if(!user) return res.json({})
    
    return res.json(user)
})


module.exports.server = server;

module.exports.messages = messages;

require('./websocket');

function makeID(length) {

    var result = '';

    var characters = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {

        result += characters.charAt(Math.floor(Math.random() * charactersLength)).toString();

    }

    return result;

}

function makeToken(length) {

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
