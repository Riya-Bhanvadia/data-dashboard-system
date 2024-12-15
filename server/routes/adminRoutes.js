const express = require("express")
const { createAdmin, loginAdmin, verifyToken, getAdminData, getAdminNames, getAllAdmin } = require("../Controller/adminController")
const { requireSignin } = require("../middleware/authMiddleware")
const routes = express.Router()

routes.post("/createAdmin",createAdmin)
routes.post("/loginAdmin",loginAdmin)
routes.get("/getAdminData/:email",getAdminData)
routes.post("/getAdminNames",getAdminNames)
routes.get("/getAllAdmin",getAllAdmin)


routes.get("/test",requireSignin,verifyToken)

module.exports = routes