const jwt = require('jsonwebtoken')

const { BlacklistModel } = require('../model/blacklist.model')

require('dotenv').config()

const Auth = async (req, res, next) => {


    const authheader = req.headers['authorization']

    if (!authheader) {
        return res.status(400).send({
            "Success": false,
            "error": "Invalid Header detected."
        })
    }

    const token = authheader.trim().split(' ')[1]

    if (token) {


        console.log("-->",token)

        try {

            const isblacklisted = await BlacklistModel.findOne({token:token})

            console.log("==>",isblacklisted)

            if(isblacklisted){
                return res.status(400).send({
                    "Success":false,
                    "error":"Token is Blacklisted."
                })
            }

            const decoded = jwt.verify(token,process.env.secretkey)

            if(decoded){

                req.body.UserID=decoded.UserID
                next()

            }
            else{
                return res.status(400).send({
                    "Success":false,
                    "error":"Token might be Expired"
                })
            }


        } catch (error) {
            return res.status(400).send({
                "Success": false,
                "msg": error.message
            })
        }


    }

    else {
        return res.status(400).send({
            "Success": false,
            "error": "Token Not Found"
        })
    }

}




module.exports = { Auth }