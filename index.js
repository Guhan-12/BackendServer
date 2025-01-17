const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require('./models/user');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://guhanagn2004:guhanarul2004@mern.1e8to.mongodb.net/crud')

app.post('/createUser', (req, res) => {
    userModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/', (req, res) => {
    userModel.find({})
    .then(users=>res.json(users))
    .catch(err => res.json(err))
})

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    userModel.findById({_id : id})
    .then(users=>res.json(users))
    .catch(err => res.json(err))
})

app.put('updateUser/:id', (req, res) => {
    const id = req.params.id;
    userModel.findByIdAndUpdate({_id : id}, {
        name : req.body.name,
        email : req.body.email,
        age : req.body.age
    })
})

app.delete('/deleteUser/:id', (req, res) =>{
    const id = req.params.id;
    userModel.findByIdAndDelete({_id : id})
    .then(users=>res.json("deleted"))
    .catch(err => res.json(err))
    // res.status(200).json("deleted");
})

app.listen(3001, () => {
    console.log("Server is running");
})