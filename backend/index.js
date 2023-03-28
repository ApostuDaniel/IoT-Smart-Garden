const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const GardenSensors = require('./models/GardenSensors.js')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

app.get('/api', async function(req, res){
    const allSensorData = await GardenSensors.find();
    res.send(allSensorData)
})

app.post("/api", async function(req, res){
    const sensorData = req.body;
    const response = await GardenSensors.create(sensorData)
    res.send(JSON.stringify(response))
})

mongoose
  .connect('mongodb://127.0.0.1:27017/iotLab6')
  .then(() => console.log('Connected!'))

app.listen(3005)

