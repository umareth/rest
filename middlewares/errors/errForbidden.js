const { STATUS_FORBIDDEN } = require('../../utils/constants');

class ForbiddenErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_FORBIDDEN;
  }
}

module.exports = ForbiddenErr;
