
const { hospital } = require("../models/hospital");


const registerHospitals=async(req,res)=>{
console.log(req.body)
try {
    const resp = await hospital.create(req.body)
console.log(resp);
res.status(201).json(resp)
} catch (error) {
    res.status(500).json(error)
}

}
const getHospital=async(req,res)=>{
    const hospitalId=req.params.id;
    try {
        const resp=await hospital.findOne({
            where:{
                Id:hospitalId
            }
        })
        if(resp){
            res.status(200).json(resp)
        }
        else{
            res.status(400).json({msg:"Not Found"}) 
        }
        
    } catch (error) {
        res.status(400).json({msg:"Not Found"})
    }
}
module.exports={registerHospitals,getHospital}