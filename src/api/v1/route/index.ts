import * as express from 'express'
let route = express.Router()
let bodyParser = require("body-parser")
route.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,accesstoken");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
route.use(bodyParser.json())
route.use(bodyParser.urlencoded({extended: false}))
// import  Matching   from "./Matching"

// import customer from "./manage-customer"
// import farm from "./manage-farming"
// import fishpond from "./manage-fishpond"
import manageall from  "./manage-all"
route.get('/',(req, res)=>{
  res.send("Access denied!");
});

route.use('/manage-all',manageall)
// route.use('/customer',customer)
// route.use('/farm',farm)
// route.use('/fishpond',fishpond)


export default route
