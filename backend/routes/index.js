const expess = require("express");
const router = expess.Router();
const userRoute = require("./user");
const accountRoute=require("./account")
router.use("/user", userRoute)
router.use("/account",accountRoute)
module.exports = router