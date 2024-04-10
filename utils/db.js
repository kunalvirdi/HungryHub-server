const mongoose=require('mongoose')

module.exports.connectToDB=async ()=>{
	return await mongoose.connect(process.env.ATLAS_URL)
}