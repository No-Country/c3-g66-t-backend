const { Router } = require("express");
const { getLocation } = require("../controllers/location");

const router = Router();

router.route("/:location").get(getLocation);

module.exports = router;
