const itemController = require("../controllers/items");
const itemRouter = require("express").Router();

itemRouter.get("/", itemController.getItems);
itemRouter.post("/", itemController.addItem);

module.exports = itemRouter;
