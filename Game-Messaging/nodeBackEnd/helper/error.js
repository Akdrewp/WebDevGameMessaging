function errorHandler(err, req, res, next) {
    console.log(err);
    return next();
}

module.exports = errorHandler;