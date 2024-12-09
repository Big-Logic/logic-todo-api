import Joi from "joi";

/*
id, user_id, title, description, status, priority, due_date, 
*/

export default Joi.object({
    user_id: Joi.string().guid({version: ['uuidv4']}).required(),
    title: Joi.string().required(),
    description: Joi.string(),
    status: Joi.string().lowercase().valid('pending', 'completed').default('pending'),
    priority: Joi.string().lowercase().valid('low', 'medium', 'high').default('low'),
    due_date: Joi.date().required()
})