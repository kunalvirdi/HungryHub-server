const Product = require("../models/Product");

const findAll=async (req,res)=>{
	try {
		const products = await Product.find(req.query)
		return res.status(200).json(products)
	} catch (error) {
		console.error(error)
	}
}

const findByID=async (req,res,next)=>{
	try {
		const productId = req.params.id
		const product = await Product.findById(productId)
		if(!product){
			const error=new Error("No Product existed")
			error.statusCode=500;
			return next(error)
		}
		return res.status(200).json(product)
	} catch (error) {
		console.error(error)
	}
}

const postProduct=async (req,res)=>{
	try {
		const {title,desc,category,price,review}=req.body;
		const newProduct = new Product({title,desc,category,img:req.file.filename,price,review})
		await newProduct.save()
		return res.status(201).json(newProduct)
	} catch (error) {
		console.error(error)
	}
}
module.exports={findAll,findByID,postProduct}