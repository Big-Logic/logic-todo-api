import Joi from "joi";

export default Joi.object({
  email: Joi.string().email().required(),
  first_name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .lowercase()
    .required(),
  middle_name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .lowercase(),
  last_name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .lowercase()
    .required(),
  password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
})