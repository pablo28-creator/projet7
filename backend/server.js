/**
 * Required External Modules
 */
 const express = require("express");
 const bodyParser = require("body-parser");
 const path = require("path");
 const { sequelize, User} = require("./models")
/**
 * App Variables
 */
 const userRoutes = require("./routes/user");
 const postRoutes = require("./routes/post");
 const commentRoutes = require("./routes/comment");
 const app = express();
 const port = process.env.PORT || "8000";
 
 
/**
 *  App Configuration
 */
 app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();  
  });
 app.use(express.json())
 app.use(bodyParser.json());
 app.use("/images", express.static(path.join(__dirname, "images")));
/**
 * Routes Definitions
 */

app.use("", userRoutes)
app.use("", postRoutes);
app.use("", commentRoutes);
/**
 * Server Activation
 */
 app.listen(port, async () => {
    console.log(`Listening to requests on http://localhost:${port}`);
    await sequelize.authenticate()
    console.log("Database Connected")
  });
  module.exports = app;  