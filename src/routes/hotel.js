const { Router } = require("express");
const hotelController = require("../controllers/hotel");

const router = Router();

router.route("/list").get(hotelController.list);

module.exports = router;