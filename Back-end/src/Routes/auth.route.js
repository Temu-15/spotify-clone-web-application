const express = require("express");
const router = express.Router();
const { refresh } = require("../Controllers/refresh_token.controller");

const { auth, callback } = require("../Controllers/auth.controller");

router.get("/", auth);
router.get("/callback", callback);
router.get("/refresh_token", refresh);

module.exports = router;
