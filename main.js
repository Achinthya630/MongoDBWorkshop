const express = require('express')
const app = express()
const userCollection = require('./modules/user')
const { name } = require('ejs')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')

app.get('/abcdwe',function(req,res){//creating a route called abcd
    res.send("Hello")
})


app.get('/home',function(req,res){
    res.render("home")
})

app.post('/create',async function(req,res){
    let {name, email, imageUrl} = req.body
    let createdUser = await userCollection.create({
        name:name,
        email:email,
        Image:imageUrl
    });
    res.redirect('/read')
});

app.get('/read', async function(req,res){
    let allUsers = await userCollection.find()
    res.render("Read",{users:allUsers})
})

app.get('/edit/:userid',async function(req,res){
    let user = await userCollection.findOne({_id:req.params.userid})
    res.render("update",{user:user})
})

app.post('/update/:userid',async function(req,res){
    let {name,email,imageUrl} = req.body
    await userCollection.findOneAndUpdate({_id:req.params.userid},{name:name,email:email,Image:imageUrl},{new:true})
    res.redirect('/read')
})

app.get('/delete/:userid', async function(req,res){
    await userCollection.findOneAndDelete({_id:req.params.userid})
    res.redirect('/read')
})

app.listen(3000)