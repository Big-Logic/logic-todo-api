import Joi from "joi";

export const tokenSchema = Joi.object({
  token: Joi.string().required(),
});

export const passwordSchema = Joi.object({
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required(),
});
