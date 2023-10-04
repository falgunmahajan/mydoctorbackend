const authorization=async(req,res)=>{
res.json(req.user)
}
module.exports={authorization}