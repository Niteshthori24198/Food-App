const {Router} = require('express')

const restaurentRouter = Router()

const {addNewRestaurent,getOneRestaurent,getAllReataurent,getMenuofSpecificRestaurent,AddNewMenuToSpecificRestaurent,deletemenuofspecificrestaurent} = require('../controller/restaurent.controller')

const {Auth} = require('../middleware/auth')


restaurentRouter.post("/create", addNewRestaurent)


restaurentRouter.get("/getall", getAllReataurent)


restaurentRouter.get("/getone/:id", getOneRestaurent)


restaurentRouter.get("/:id/menu",getMenuofSpecificRestaurent)


restaurentRouter.post("/:id/menu",Auth,AddNewMenuToSpecificRestaurent)

restaurentRouter.delete("/:rid/menu/:mid", Auth,deletemenuofspecificrestaurent)

module.exports = {
    restaurentRouter
}