const express = require("express");
const app = express();
require("dotenv").config({ path: "Config/.env" });
const userRoutes = require("./Routes/userRoutes");
const notFound = require("./Middlewares/notFound");
const bodyParser=require("body-parser")
const cookieParser = require("cookie-parser");

app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

//error handling
const ErrorMiddleware = require("./Middlewares/Error");
app.use(notFound);
app.use(ErrorMiddleware);

//connect database
const connectDb = require("./Db/connectDb");
connectDb();

//server connection
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is listening on port ${port}`));
