const { Router } = require("express");
const { list } = require("../controllers/hotel");
const hotelByIdController = require("../controllers/hotelById");

const router = Router();

router.route("/list").get(list);
router.route("/single/:id").get(hotelByIdController.id);

module.exports = router;
