
const { RestaurentModel } = require('../model/restorent.model')


const addNewRestaurent = async (req, res) => {

    try {

        const newrest = new RestaurentModel({ ...req.body })

        await newrest.save()

        return res.status(200).send({
            "Success": true,
            "msg": "New restaurent has been created.",
            "Restaurent": newrest
        })

    }
    catch (error) {
        return res.status(400).send({
            "Success": false,
            "msg": error.message
        })
    }

}




const getAllReataurent = async (req, res) => {

    try {

        const data = await RestaurentModel.find({})

        return res.status(200).send({
            "Success": true,
            "msg": "Restaurent fetched successfully.",
            "Restaurents": data

        })

    }
    catch (error) {
        return res.status(400).send({
            "Success": false,
            "msg": error.message
        })
    }
}




const getOneRestaurent = async (req, res) => {

    const { id } = req.params

    try {

        const data = await RestaurentModel.findOne({ _id: id })

        if (!data) {
            return res.status(400).send({
                "Success": false,
                "msg": "Restaurent Not Found",
                "Restaurent": data

            })
        }

        return res.status(200).send({
            "Success": true,
            "msg": "Restaurent fetched successfully.",
            "Restaurent": data

        })

    }
    catch (error) {
        return res.status(400).send({
            "Success": false,
            "msg": error.message
        })
    }
}


const getMenuofSpecificRestaurent = async (req, res) => {

    const { id } = req.params;

    try {

        const isfound = await RestaurentModel.findOne({ _id: id })

        if (!isfound) {
            return req.status(400).send({
                "Success": false,
                "msg": "Restaurent Not Found."
            })
        }


        return res.status(200).send({
            "Success": true,
            "Menu": isfound.menu
        })


    } catch (error) {
        return res.status(400).send({
            "Success": false,
            "msg": error.message
        })
    }


}



const AddNewMenuToSpecificRestaurent = async (req, res) => {

    const { id } = req.params;


    try {

        const isfound = await RestaurentModel.findOne({ _id: id })

        if (!isfound) {
            return req.status(400).send({
                "Success": false,
                "msg": "Restaurent Not Found."
            })
        }

        let data = isfound;

        // console.log("menu",data)

        data.menu.push(req.body)

        // console.log("new menu",data)

        await data.save()

        return res.status(201).send({
            "Success": true,
            "msg": "New menu items has been added"
        })


    } catch (error) {
        return res.status(400).send({
            "Success": false,
            "msg": error.message
        })
    }


}




const deletemenuofspecificrestaurent = async (req, res) => {

    const { rid, mid } = req.params

    try {

        const isfound = await RestaurentModel.findOne({ _id: rid })

        if (!isfound) {
            return req.status(400).send({
                "Success": false,
                "msg": "Restaurent Not Found."
            })
        }

        let data = isfound;

        const menudata=data.menu

        const newdata=menudata.filter((ele)=>{
            return ele._id!=mid
        })

        console.log("====>",newdata)

        data.menu=newdata;

        console.log("updated",data)

        await data.save()

        return res.status(202).send({
            "Success":true,
            "msg":"Menu items has been removed."
        })


    } catch (error) {
        return res.status(400).send({
            "Success": false,
            "msg": error.message
        })
    }

}







module.exports = { addNewRestaurent, getAllReataurent, getOneRestaurent, getMenuofSpecificRestaurent, AddNewMenuToSpecificRestaurent, deletemenuofspecificrestaurent }