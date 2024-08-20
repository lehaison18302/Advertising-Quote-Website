const fixRoute = require("./fix");
const addRoute = require("./add");
const deleteRoute = require("./delete");
const searchRoute = require("./search");
const loginRoute = require("./login");
const homepage = require("./homepage");
const admin = require("./admin");
const userroute = require("./user");
const rootRouter = require("express").Router();

rootRouter.use(loginRoute);
rootRouter.use(fixRoute);
rootRouter.use(addRoute);
rootRouter.use(deleteRoute);
rootRouter.use(searchRoute);
rootRouter.use(homepage);
rootRouter.use(admin);
rootRouter.use(userroute);

module.exports = rootRouter;