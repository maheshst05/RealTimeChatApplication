const express = require('express');
const app = express();
app.use(express.json())
const cors = require('cors')
app.use(cors());
const {Connection}= require('./db')
const{ userRoute}= require('./Routes/userRoute')
app.use("/user", userRoute)
app.listen(9090,async()=>{
    await Connection
    console.log('Connection established..')
    console.log('listening on 9090')
})