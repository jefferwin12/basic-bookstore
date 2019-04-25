require('app-module-path').addPath(require('app-root-path').toString());

const httpError = require('api/responses/HttpError')

class NotFoundError extends httpError{
    constructor(message = 'Not Found error') {
        super(404, 9996, message);
    }
}

module.exports = NotFoundError;