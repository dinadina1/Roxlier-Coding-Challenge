// check if promise is resolved or reject
module.exports = (func) => (req, res, next) =>
    Promise.resolve(func(req, res, next)).catch(next);