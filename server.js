const {connectToDB}=require('./utils/db')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const {app}=require('./utils')


// routes & middlewares
// those two middlewares make req.body accessible, otherwise it would be undefined!!!

app.use('/auth', authRoute)
app.use('/product', productRoute)


app.use((err,req,res,next)=>{
	return res.status(err.statusCode).json({response:"error",statusCode:err.statusCode,message:err.message});
})
connectToDB().then(()=>{
	app.listen(process.env.PORT,()=>console.log("Server running"))
}).catch(error=>console.log(error))

// server is on port 5000, client is on port 3000,
// we are going to get a cors ERROR!!, but cors() removes that's error