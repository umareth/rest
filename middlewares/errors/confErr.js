const { STATUS_CONFLICT } = require('../../utils/constants');

class Conflicted extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CONFLICT;
  }
}

module.exports = Conflicted;
