class ErrorResponse extends Error {
  constructor(code, message, data) {
    super(message);
    this.code = code || 500;
    this.data = data;
  }
}
module.exports = ErrorResponse;
