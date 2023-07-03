const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Redis = require('ioredis');
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mysql = require('mysql2');
const bcrypt = require("bcrypt");
const Joi = require("joi");
const util = require('util');

server = http.createServer(app);

const PORT = process.env.PORT || 8080;

// io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000"
//   }
// });

// // redisConnection = new Redis({
// //   port: 6379,
// //   host: "127.0.0.1",
// //   password: "my-top-secret",
// // });

// io.on("connection", (socket) => {
//   console.log("Client connected: " + `${socket.id}`);
//   socket.on("send_message", (message) => {
//     console.log(message);
//   });
// });

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'web_messaging_app',
  password: 'passwordMySQL',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0
})

pool.getConnection(function(err, conn) {
  if (err) {
    console.log("SQL Server Error");
    return 1;
  }
  pool.releaseConnection(conn);
});

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(require('./error'))

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/lost", function(req, res) {
    const userName = req.body.userName;
    console.log("User completed form");
    res.json({ userName : `User Name: ${userName}`});
});

const Schema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(5)
    .max(20)
    .required(),
  
  password: Joi.string()
  .pattern(/^[a-zA-Z0-9!@#$%^&*()-_=+{}[\]|\\:;"'<>,.?\/]+$/)
  .min(8)
  .max(40)
  .required(),

  repeat_password: Joi.ref('password'),

  email: Joi.string()
  .email()
  .required()
});

hash = util.promisify(bcrypt.hash);
poolExecute = util.promisify(pool.execute).bind(pool);

//Account create attempt
app.post("/register", async function(req, res, next) {
  const registerFormData = req.body;
  const username = registerFormData.username;
  const email = registerFormData.email;
  const password = registerFormData.password;

  var formErrors = Schema.validate({ username: username, email: email, password: password}).error;

  if ( formErrors ) {
    console.log(errors.error)
    res.status(400).send(errors.error)
    return 1;
  }

  const numSaltRounds = 1; //Should be atleast 8 but set to 1 to make faster
  
  Promise.all(
    [poolExecute("SELECT * FROM users WHERE userName = ? LIMIT 1", [username]), poolExecute("SELECT * FROM users WHERE userEmail = ? LIMIT 1", [email])])
    .then((results) => {
      let errors = [];
      const [usernameResults, emailResults] = results;
      if (usernameResults.length != 0) {
        errors.push("An account with that username already exists");
      }
      if (emailResults.length != 0) {
        errors.push("An account with that email already exists");
      }
      if (errors.length != 0) {
        res.status(409).json( {errors: errors} );
        throw new Error("Account with that username or email already exists", {cause: 409});
      }
    })
    .then(() => {
      return hash(password, numSaltRounds);
    })
    .then((hash) => {
      poolExecute("INSERT INTO users (userName, userEmail, userHashedPassword) VALUES (?, ?, ?)", [username, email, hash]);
    })
    .then(() => {
      console.log("Put into sqlDb")
    })
    .catch((err) => { next(err); }); 
  
  // hash(password, numSaltRounds)
  //   .then((hash) => {
  //     poolExecute("INSERT INTO users (userName, userEmail, userHashedPassword) VALUES (?, ?, ?)", [username, email, hash])
  //       .then((results, field) => {
  //         console.log("Then!");
  //         // return res.status(200).json({ message: "Successful", userName: `${req.body.username}123` });
  //       })
  //       .catch((error) => {
  //         console.log("Caught!");
  //         return res.status(503).json({ error: "no good SQL" });
  //       });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     return res.status(503).json({ error: "no good BCrypt" });
  //   });
})

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}` + `\nVisit http://localhost:${PORT}/`);
});