const controller = require("../controllers/cryptocurrency");
const router = require("express").Router();
const crypto = require("../middleware/cryptocurrency");

router.get("/all", controller.cryptos);
router.get("/", controller.cryptoOfUser);

router.post("/", crypto.isExist, controller.crypto);

router.put("/", controller.crypto);
router.post("/", controller.crypto);

module.exports = router;
