const {Router} = require('express')

const orderRouter = Router()

const {Auth} = require('../middleware/auth')


const {placeOrder,getorderdata} = require('../controller/order.controller')


orderRouter.post("/neworder", Auth, placeOrder)


orderRouter.get("/get/:oid",getorderdata)

module.exports = {orderRouter}