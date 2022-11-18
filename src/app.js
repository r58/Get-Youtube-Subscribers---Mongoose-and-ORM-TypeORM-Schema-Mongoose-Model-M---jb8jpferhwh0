const express = require("express");
const app = express();
const Subscriber = require("./models/subscribers");

app.get("/subscribers", (req, res) => {
  Subscriber.find().then((subscribers) => res.send(subscribers));
  return;
});
app.get("/subscribers/names", (req, res) => {
  Subscriber.find()
    .select({ name: 1, subscribedChannel: 1 })
    .then((subscribers) => res.send(subscribers));
  return;
});

app.get("/subscribers/:id", (req, res) => {
  const id = req.params.id;

  Subscriber.find({ _id: id })
    .then((subscriber) => subscriber.map((subs) => res.send(subs)))
    .catch((err) => res.status(400).send({ message: err.message }));
  return;
});
/*
app.get('/subscribers/:id',async(req,res)=>{
    const id = req.params.id;
    try{
    const subscriber = await Subscriber.findById(id);
    console.log(subscriber);
    res.send(subscriber);
    }catch(err){
        res.status(400).send({message:err.message});
    }
  });
*/

module.exports = app;
