const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const gardenSensorsSchema = new Schema({
    temperature: {type: Number, min: -40, max: 125},
    moisture:{type: Number},
    light:{type: Number},
    proximity:{type: Boolean},
    date:{type: Date, default: Date.now}
});

module.exports = mongoose.model('GardenSensors', gardenSensorsSchema);
