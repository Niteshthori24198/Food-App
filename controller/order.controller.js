const { OrderModel } = require('../model/order.model');

const { UserModel } = require('../model/user.model')

const { RestaurentModel } = require('../model/restorent.model')


const placeOrder = async (req, res) => {

    const { UserID } = req.body;

    try {

        const neworder = new OrderModel({ ...req.body })

        return res.status(201).send({
            "Success": true,
            "msg": "New order placed Successfully",
            "OrderData": neworder
        })



    }
    catch (error) {
        return res.status(400).send({
            "Success": false,
            "error": error.message
        })
    }


}




const getorderdata = async (req, res) => {

    const { UserID } = req.body;

    const { oid } = req.params

    try {

        // const data=await OrderModel.aggregate([{$match:{_id:oid}} , {$lookup:  {from:"user",localField:"_id", foreignField:"user", as:"Orders"}} ])

        const data= await OrderModel.findOne({_id:oid})

        return res.status(200).send({
            "Success":true,
            "Order":data
        })


    } catch (error) {
        return res.status(400).send({
            "Success": false,
            "error": error.message
        })
    }


}



module.exports = { placeOrder, getorderdata }