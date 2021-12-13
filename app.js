const express = require("express");
const createError = require("http-errors");
require("dotenv").config();
require("./src/services/db");
const router = require("./src/routers");

/*
 * #Elementary variable.
 */
const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

/*
 * #Default EndPoint.
 */
app.get("/", (req, res, next) => {
  res.send({
    status: 200,
    doc: "welcom to -:: #Cruck-Crypto ::-",
  });
});

/*
 * EndPoint
 */

app.use("/v1/api/user", router.user);
app.use("/v1/api/crypto", router.cryptocurrency);
/*
* #Http Error
-> capture les erreurs lié aux url.
*/
app.use(async (req, res, next) => {
  next(createError.NotFound("This route do not exist"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`server runing at 🚀 http://localhost:${port}`);
});
