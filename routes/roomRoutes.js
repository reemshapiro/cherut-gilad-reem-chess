const express = require("express");
const roomController = require("../controllers/roomController");
const router = express.Router();

router.post("/getroom", roomController.getroom);

module.exports = router;