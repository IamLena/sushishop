require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const itemRouter = require("./routes/items");

app.use("/api/items", itemRouter);

app.listen(process.env.APP_PORT, () => {
	console.log("server is up and running on ", process.env.APP_PORT);
})
