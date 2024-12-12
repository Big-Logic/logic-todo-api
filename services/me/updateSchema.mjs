import Joi from "joi";

export default Joi.object({
  first_name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .lowercase(),
  middle_name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .lowercase(),
  last_name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .lowercase(),
});
