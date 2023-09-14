const LocalStrategy = require("passport-local");
const mysql = require('mysql2');
const bcrypt = require("bcrypt");
const util = require('util');

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
});

compare = util.promisify(bcrypt.compare);
poolExecute = util.promisify(pool.execute).bind(pool);

const localStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},function verify(email, password, cb) {
    console.log(`${email}, ${password}`);
    poolExecute("SELECT userEmail, userHashedPassword FROM users WHERE userEmail = ? LIMIT 1", [email])
        .then((result) => {
            console.log(result.userHashedPassword);
            if(result.length == 0) {
                return cb(null, false, { message: 'Incorrect username or password.' });
            }
            if (!compare(password, result[1])) {
                return cb(null, false, { message: 'Incorrect username or password.' });
            }
            else {
                return cb(null, {username: email});
            }
        })
        .catch((err) => {
            console.log(err);
            return cb(err);
        })
});

module.exports = localStrategy;