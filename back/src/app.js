const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const archRouter = require("./routes/architectures/architecture.route");
const goalRouter = require("./routes/goals/goal.route");
const reportRouter = require("./routes/reports/reports.route");
const authRouter = require("./routes/auths/auth.route");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/architecture", archRouter);
app.use("/goal", goalRouter);
app.use("/report", reportRouter);
app.use(authRouter);

module.exports = app;
