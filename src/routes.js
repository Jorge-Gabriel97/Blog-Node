const express = require("express")
const postsController = require("./controllers/postsController")

const router = express.Router()

router.get("/", postsController.index)
router.get("/posts/new", postsController.new)
router.get("/posts/:id", postsController.show)
router.post("/posts", postsController.create)

module.exports = router