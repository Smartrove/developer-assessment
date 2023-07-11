const express = require("express");
const dotenv = require("dotenv/config");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const dbConnection = require("./config/db/dbConnection");
const url = process.env.URL;
const userUrl = `${url}/user`;
const userRouter = require("./routes/user/user");

const port = process.env.PORT || 3000;
console.log(port);

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use(userUrl, userRouter);

app.listen(port, () => console.log(`server started at port ${port}`));
