const express = require("express")
const postsController = require("./controllers/postsController")

const router = express.Router()

router.get("/posts", postsController.index)
router.get("/posts/:id", postsController.show)
router.post("/posts", postsController.create)
router.put("/posts/:id", postsController.update)
router.delete("/posts/:id", postsController.delete)

module.exports = router
