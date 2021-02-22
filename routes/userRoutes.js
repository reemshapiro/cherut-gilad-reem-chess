const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();


router.post("/login", userController.login);

router.post("/signup", userController.signup);

router.post("/updateUser", userController.updateUser);

router.get("/:username", userController.getUserByName);



module.exports = router;

