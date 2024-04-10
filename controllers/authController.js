const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const register=async (req,res,next)=>{
	try {
		const isExisting = await User.findOne({email: req.body.email})
		if(isExisting){
			const error=new Error('Account already existed, Try to create with different ID')
			error.statusCode=403
			return next(error)
		}
		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		const user=new User({...req.body,password:hashedPassword})
		const newUser=await user.save()
		const {password, ...others} = newUser._doc
		const token = jwt.sign({id: newUser._id, isAdmin: newUser.isAdmin}, process.env.JWT_SECRET)
		return res.status(201).json({others, token})
	} catch (error) {
		return res.status(500).json(error.message)
	}
}

const login=async (req,res,next)=>{
	const {email}=req.body
	try{
		const user=await User.findOne({email})
		if(!user){
			const error=new Error(`user with email ${email} not existed.`)
			error.statusCode=404;
			next(error)
		}
		const isAuthenticated=await bcrypt.compare(req.body.password,user.password)
		if(!isAuthenticated){
			const error=new Error("Wrong password, try again!")
			error.statusCode=401
			return next(error)
		}

		const {password, ...others} = user._doc
		const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET)
		return res.status(200).json({statusCode:200,response:"success",user:{...others}, token})
	}catch(error){
		console.log(error)
	}
}

module.exports={register,login}