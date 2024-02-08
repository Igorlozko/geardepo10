import Gear from "../models/Gear.js";
import tryCatch from "./utils/tryCatch.js";


export const createGear = tryCatch(async(req, res)=>{
    const {id: uid, name: uName, photoURL: uPhoto} = req.user;
    const newGear = Gear({
        ...req.body, 
        uid, 
        uName,
        uPhoto
    });
    await newGear.save();
    res.status(201).json({success: true, result: newGear});
});

export const getGears = tryCatch(async (req, res) =>{
    const gears = await Gear.find().sort({_id: -1 });
    res.status(200).json({success: true, result: gears });
});