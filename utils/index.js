const multer = require('multer')
require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const bodyParser=require('body-parser')

app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
app.use('/images',express.static('public/images'))






const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/images")
	},
	filename: (req, file, cb) => {
		cb(null,Date.now().toString()+'-'+file.originalname)
	}
})

const upload = multer({
	storage
})

module.exports={app,upload}
