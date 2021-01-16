const express = require("express")
const app = express();
const catsRoutes = require("./routes/cats")
const ExpressError = require("./expressError")

app.use(express.json());
app.use("/cats", catsRoutes);


// 404 handler
app.use(function(req, res, next) {
  return new ExpressError("Not Found", 404);
});


// general error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});


// MOVED to server.js - need in separte file for when running supertests
// app.listen(3000, function(){
//   console.log("Server starting on port 3000")
// })

module.exports = app;