const {Router} = require('express')

const userRouter = Router()

const {registerNewUser,LoginUser,LogoutUser,resetPassword}=require('../controller/user.controller')

const {Auth} = require('../middleware/auth')


userRouter.post("/register", registerNewUser)

userRouter.post("/login", LoginUser)


// login requierd as protected route : middleware

userRouter.get("/logout",Auth,LogoutUser)

userRouter.patch("/:id/reset", resetPassword)



module.exports = {userRouter}