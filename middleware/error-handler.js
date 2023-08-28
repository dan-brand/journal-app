const errorHandlerMiddleware = (err, req, res, next) => {

    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || 'Something went wrong, try again later'
    
    res.status(statusCode).json({ msg: errorMessage })
}

module.exports = errorHandlerMiddleware;