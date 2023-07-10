
const express = require('express')

const {connection} = require('./db')

const { restaurentRouter } = require('./routes/restaurent.route')

const { userRouter } = require('./routes/user.route')

const {orderRouter} = require('./routes/order.route')

require('dotenv').config()

const app=express()

app.use(express.json())



app.use("/api/restaurent", restaurentRouter)


app.use("/api/user",userRouter)



app.use("/api/orders",orderRouter)


app.all('*',(req,res)=>{
    return res.status(404).send("Invalid Url Detected.")
})



app.listen(process.env.port || 3000 , async()=>{
    try {
        
        await connection
        console.log('Connected to DB. Server is running !')

    } 
    catch (error) {
        console.log(error)
    }
})