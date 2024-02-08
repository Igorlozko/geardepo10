import mongoose from "mongoose";

const gearSchema = mongoose.Schema({
    lng:{type: Number, required: true},
    lat:{type: Number, required: true},
    price:{type: Number, min:0, max:10000, default:0},
    title:{type: String, required: true, minLength:5, maxLength:150},
    description:{type: String, required: true, minLength:10, maxLength:10000},
    images:{type:[String], validate:(v) => Array.isArray(v) && v.length > 0},
    uid:{type: String, required: true},
    uName:{type: String, required: true},
    uPhoto:{type: String, required: false},
},
    {timestamps: true}
)

const Gear = mongoose.model('gears', gearSchema);

export default Gear;