const express=require("express")
const app=express()
const dotenv=require("dotenv").config()
const connectDb=require("./config/connectionDb")
const cors=require("cors")

const PORT=process.env.PORT || 3000
connectDb()
const allowedOrigins = [
  "http://localhost:5174",
    "https://foodapp-fawn-tau.vercel.app"
];
app.use(express.json())
app.use(cors({
  origin: [
    "http://localhost:5174",
    "https://foodapp-fawn-tau.vercel.app"
  ],
  credentials: true
}))
app.use(express.static("public"))

app.use("/",require("./routes/user"))
app.use("/recipe",require("./routes/recipe"))

app.listen(PORT,(err)=>{
    console.log(`app is listening on port ${PORT}`)
})
