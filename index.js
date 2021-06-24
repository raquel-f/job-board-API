const express = require("express");
var compression = require('compression');
const bodyParser = require("body-parser");
const app = express();
app.use(compression());
const port = process.env.PORT || 3001;

// import routers
const jobBoardRouter = require("./routes/jobPost");
const skillsRouter = require("./routes/skill");
const jobTypeRouter = require("./routes/jobType");
const locationRouter = require("./routes/location");
const skillSetRouter = require("./routes/skillSet");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  // cors enabling
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // api is ready
  res.json({ message: "ready!" });
});

// use routers
app.use("/jobPost", jobBoardRouter);
app.use("/skill", skillsRouter);
app.use("/jobType", jobTypeRouter);
app.use("/location", locationRouter);
app.use("/skillSet", skillSetRouter);

// error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
