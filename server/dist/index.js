"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _connection = _interopRequireDefault(require("./database/connection"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Database connection

_dotenv.default.config();
const zomato = (0, _express.default)();
zomato.use(_express.default.json());
zomato.get('/', (res, req) => {
  res.json({
    message: "server is running"
  });
});
const PORT = 4000;
zomato.listen(PORT, () => {
  // ConnectDB()
  // .then(() => {
  //     console.log("server is Running !!!");
  // })
  // .catch((error)=> {
  //     console.log("Server is running, but database connection failed");
  //     console.log(error);
  // });

  console.log("server is Running !!!");
});