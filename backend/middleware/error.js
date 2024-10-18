// function to handling errors
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    // return response if it is development
    if(process.env.NODE_ENV === 'development'){
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: err.stack,
            error: err
        });
    };

    // return response if it is production
    if(process.env.NODE_ENV === "production"){

        let message = err.message;
        let error = new Error(message);

        // cast error
        if(err.name === "CastError"){
            let message = `Resource not found: ${err.path}`;
            error = new Error(message);
            err.statusCode = 400;
        }

        res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    };
}