var Router = require("express").Router();
var { index , show ,  store , destroy , update } = require("../controllers/reservations")

Router.get("/" , index);
Router.get("/:id" , show);
Router.post("/" ,  store);
Router.get("/:id" ,  destroy);
Router.get("/:id" ,  update);

module.exports = Router