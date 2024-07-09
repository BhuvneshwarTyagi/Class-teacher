const express = require("express");
const router = express.Router();

const fetch = require("./fetch");
const create = require("./create");
const del = require("./delete");




router.use("", create);
router.use("/fetch", fetch);
router.use("", del);


module.exports = router;