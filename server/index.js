const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors=require("cors")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const multer=require("multer")
const { verifyAccessToken } = require('./utils/verifyToken');
// const port = 8000;
dotenv.config()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// app.use("/", express.static("public/uploads"));
// app.use(bodyParser. text({type: '/'}));
// app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(multer().single('profilePicture'));
// app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log(req,"Request");
  res.send('Hello, this is hello message from the server!');
});


const authRoutes=require('./controller/authController');
app.use('/auth',authRoutes)

//middleware
app.use(verifyAccessToken)

const carRoutes=require('./controller/carController');
app.use("/car",carRoutes)

app.listen(process.env.port, () => {
  console.log(`Server is running at http://localhost:${process.env.port}`);   
});

mongoose.connect(process.env.MONGOOSE_URI)
.then(() => {
    console.log("MongoDB connected Successfully!");
    
}).catch((err) => {  
    console.log(err);
})