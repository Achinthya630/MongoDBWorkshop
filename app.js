const express= require('express')
const app =express();

// to get what that usercollection file is exporting do
const userModel= require('./usercollection');


app.get('/home',function(req,res){
    res.send("Hello")
})

// in this the mongodb ppl said that whatever mongo db operations are performed are ansynchronous , so to avoid the exxecuting last , make function async and make next following code to wait until our usercreate(crud operation i.e ansync opeartion) is performed
app.get('/create',async function(req,res){
    const createdUser =await userModel.create({
        name : "Heens",
        email : "Heenakaf143@gmail.com"
    })

    res.send(createdUser);
})
app.get('/create1',async function(req,res){
    const createdUser =await userModel.create({
        name : "kouser",
        email : "Heenakaf143@gmail.com"
    })

    res.send(createdUser);
})

// now lets update user , to uptdate use update.findoneandupdate({specify based on what field u wanna search a dosument},{update},{new:true})

app.get('/update',async function(req,res){
    const updatedUser=await userModel.findOneAndUpdate({name:"Heens"},{name:"Heena"},{new:true})
    res.send(updatedUser)
})

// now lets read users, there are 2 ways read all users read one based on unique field or the field, for these u can use both find and findOne function
// read all
app.get('/readall',async function(req,res){
    const Users=await userModel.find();
    res.send(Users);
})

// read one user 
app.get('/readone',async function(req,res){
    const User=await userModel.findOne({name: "Heena"});
    res.send(User);
})

// delete
app.get('/delete',async function(req,res){
    const deltedUser=await userModel.findOneAndDelete({name:"Heena"})
    res.send(deltedUser);
})


app.listen(3000);