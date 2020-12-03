const itemController = require("../controllers/items");
const itemRouter = require("express").Router();

itemRouter.get("/", itemController.getItems);
itemRouter.post("/", itemController.addItem);
itemRouter.get("/:id", itemController.getItemById);
itemRouter.patch("/:id", itemController.updateItemById);
itemRouter.delete("/:id", itemController.deleteItemById);

module.exports = itemRouter;
