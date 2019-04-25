const {forEach} = require('lodash');

class HttpSuccess {
    constructor(
        status = 200,
        message = 'Operation completed successfully', additionalData) {
            this.timestamp = new Date();
            this.status = status;
            this.message = message;

            forEach(additionalData, (value,key) => {
                this[key] = value;
            });
        }
}

module.exports = HttpSuccess;