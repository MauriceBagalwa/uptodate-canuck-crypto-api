const controller = require("../controllers/user");
const { users, save } = require("../controllers/user");
const router = require("express").Router();
const { userExist, compteCryptoExist } = require("../services/milddleware");
const { numberPhoneExist } = require("../middleware/user");

router.get("/", users);
router.post("/", userExist, save);

// router.get("/resend", controller.resendCode);

// router.post("/signin", controller.signin);
// router.post("/active", controller.activeAcount);

// router.post("/sms", controller.resendCode);

// router.put("/", controller.update);
// router.put("/password", controller.changePassword);
// router.put("/phonenumber", numberPhoneExist, controller.changeNumberPhone); // #modification du numéro de telephone

// K49l[fxEaHIQUay0
// router.put("/compte/add", compteCryptoExist, controller.compteCrypto);
// router.put("/compte/update", compteCryptoExist, controller.updateCompteCrypto);

module.exports = router;
