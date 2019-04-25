class HttpError extends Error {
    constructor(
        status= 500,
        code = 9999,
        message = 'System Error') {
            super();
            this.timestamp = new Date();
            this .status = status;
            this.code = code;
            this.message = message;
        }
}

module.exports = HttpError;