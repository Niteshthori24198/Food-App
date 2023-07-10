const mongoose = require('mongoose')

const { UserModel } = require('../model/user.model')

const { RestaurentModel } = require('../model/restorent.model')

const orderSchema = mongoose.Schema({


    user: { type: mongoose.Schema.Types.ObjectId, ref: UserModel, required: true },

    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: RestaurentModel, required: true },

    items: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
        }
    ],

    totalPrice: { type: Number, required: true },
    deliveryAddress: {

        street: { type: String, required: true },

        city: { type: String, required: true },

        state: { type: String, required: true },

        country: { type: String, required: true },

        zip: { type: String, required: true },
    },

    status: { type: String, enum: ["placed", "preparing", "on the way", "delivered"], default: "placed", required: true },

},

    { versionKey: false }

)


const OrderModel = mongoose.model("order", orderSchema)

module.exports = { OrderModel }