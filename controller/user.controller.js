const { UserModel } = require('../model/user.model')

const {BlacklistModel}=require('../model/blacklist.model')

const jwt = require('jsonwebtoken')

require('dotenv').config()

const bcrypt = require('bcrypt')


const registerNewUser = async (req, res) => {

    const {email,password}=req.body

    try {

        const isPresent = await UserModel.findOne({email})    
        
        if(isPresent){
            return res.status(400).send({
                "Success":false,
                "msg":"User account Already exists.. kindly login!"
            })
        }

        const hashpass = bcrypt.hashSync(password,5)


        const newuser = new UserModel({...req.body,password:hashpass})

        await newuser.save()

        return res.status(201).send({
            "Success":true,
            "msg":"User Registered successfully.",
            "User":newuser
            
        })



    } catch (error) {
        return res.status(400).send({
            "Success": false,
            "msg": error.message
        })
    }
}




const LoginUser = async(req,res)=>{

    const {email,password}=req.body;

    if(!email || !password){
        return res.status(400).send({
            "Success":false,
            "error":"Please provide all required details."
        })
    }

    try {

        const isPresent = await UserModel.findOne({email})    
        
        if(!isPresent){
            return res.status(400).send({
                "Success":false,
                "msg":"User account Not Found.."
            })
        }

        const passcheck= bcrypt.compareSync(password,isPresent.password)

        if(!passcheck){
            return res.status(400).send({
                "Success":false,
                "msg":"Invalid Password Detected.."
            })
        }

        const token = jwt.sign({UserID:isPresent._id}, process.env.secretkey, {expiresIn:'6h'})
      
        return res.status(201).send({
            "Success":true,
            "msg":"Login Done",
            "token":token
        })


    } catch (error) {
        return res.status(400).send({
            "Success": false,
            "msg": error.message
        })
    }
}



const LogoutUser = async(req,res)=>{

    const authheader = req.headers['authorization']

    const token = authheader.trim().split(' ')[1]

    try {

        const usertoken = new BlacklistModel({token:token})

        usertoken.save()

        return res.status(201).send({
            "Success":true,
            "msg":"Logout done"
        })
        
    } catch (error) {
        return res.status(400).send({
            "Success": false,
            "msg": error.message
        })
    }

}





const resetPassword = async(req,res)=>{

    const {password,newpassword}= req.body;

    const {id}=req.params

    console.log(password,newpassword,id)

    if(!password || !newpassword){
        return res.status(400).send({
            "Success":false,
            "msg":"Kindly provide all details."
        })
    }

   

    try {

        const user = await UserModel.findOne({_id:id})    
        
        const passcheck= bcrypt.compareSync(password,user.password)

        if(!passcheck){
            return res.status(400).send({
                "Success":false,
                "msg":"Your old Password is not correct.."
            })
        }

        const hashpass = bcrypt.hashSync(newpassword,5)

        user.password=hashpass

        await user.save()

        console.log("done")


        return res.status(200).send({
            "Success":true,
            "msg":"Password changed successfully."
        })

        
    } catch (error) {
        return res.status(400).send({
            "Success": false,
            "msg": error.message
        })
    }


}




module.exports = { registerNewUser, LoginUser, LogoutUser, resetPassword }