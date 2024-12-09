class SupabaseError extends Error {
  constructor(errorObj) {
    super(errorObj.message);
    this.name = "SupabaseError";
    this.error = errorObj;
  }
}

export default SupabaseError;
