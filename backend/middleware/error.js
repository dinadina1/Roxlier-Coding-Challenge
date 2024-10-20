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
            message = `Resource not found: ${err.path}`;
            error = new Error(message);
            err.statusCode = 400;
        }

        // validation error
        if(err.name === "ValidationError"){
            message = Object.values(err.errors).map(value => value.message);
            error = new Error(message);
            err.statusCode = 400;
        }

        // 11000 code error
        if(err.code === 11000){
            message = `Duplicate ${Object.keys(err.keyValue)} error`;
            error = new Error(message);
            err.statusCode = 400;
        };

        // JSON webtoken error
        if(err.name === 'JSONWebTokenError'){
            message = 'JSON Web Token is invalid. Try again';
            error = new Error(message);
            err.statusCode = 400;
        }

        // Token expired error
        if(err.name = 'TokenExpiredError'){
            message = `JSON Web Token is expired. Try again`;
            error = new Error(message)
            err.statusCode = 400
        }

        res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    };
}