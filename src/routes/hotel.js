const { Router } = require("express");
const { list, photos, reviews } = require("../controllers/hotel");

const router = Router();

router.route("/list").get(list);
router.route("/photos").get(photos);
router.route("/reviews").get(reviews);

module.exports = router;
