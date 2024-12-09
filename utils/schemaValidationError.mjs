class SchemaValidationError extends Error {
  constructor(errorObj) {
    super(errorObj.message);
    this.name = "SchemaValidationError";
    this.error = errorObj;
  }
}

export default SchemaValidationError;
