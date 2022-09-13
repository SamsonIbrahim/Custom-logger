const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const Logger = require("./service/logger-service");
const logger = new Logger("index");
app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);
app.use(bodyparser.json);

app.post("/test", (req, res) => {
  const body = req.body;
  let error = {};
  //// Adding body of the request as log data
  logger.setLogData(body);

  logger.info("Request Received by at /test ", req.body);

  // We are expecting name,age and gender in the body of the request

  if (body.name == null || body.name == "") {
    logger.error("Name field is empty");
    error["name"] = "name field is empty";
  }

  if (body.age == null || body.age == "") {
    logger.error("Age field is empty");
    error["age"] = "age field is empty";
  }

  if (body.gender == null || body.gender == "") {
    logger.error("Gender field is empty");
    error["gender"] = "gender field is empty";
  }
  if (Object.keys(error).length != 0) {
    logger.error("Return error response", {
      sucess: false,
    });
    res.send("Error");
  } else {
    logger.info("Return sucess response", {
      sucess: true,
    });
    res.send("No Error");
  }
});

app.listen(4000, () => {
  logger.info("APP LAUNCHED IN PORT 4000");
});
