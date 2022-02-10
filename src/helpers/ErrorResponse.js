class ErrorResponse extends Error {
  constructor(code, message, data) {
    super(message);
    this.statusCode = code || 500;
    this.data = data;
  }
}
module.exports = ErrorResponse;
