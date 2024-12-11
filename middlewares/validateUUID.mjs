import Joi from "joi";
import SchemaValidationError from "../utils/schemaValidationError.mjs";

// schema
const uuidSchema = Joi.string().uuid({version: "uuidv4"})

// this function is meant to be pass to router.param as a callback
export default (req, res, next, val) => {

 //   validate schema
  const {error} = uuidSchema.validate(val);

  if(error) {
    next(new SchemaValidationError(error));
  }else {
      next();
  }

};
