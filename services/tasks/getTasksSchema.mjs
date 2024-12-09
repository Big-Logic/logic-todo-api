import Joi from "joi";

/*
id, user_id, title, description, status, priority, due_date, 
*/

export default Joi.object({
  id: Joi.string().guid({ version: ["uuidv4"] }),
  user_id: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
  status: Joi.string().lowercase().valid("pending", "completed"),
  priority: Joi.string().lowercase().valid("low", "medium", "high"),
  due_date: Joi.date().iso(),
});
