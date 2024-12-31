// db
import supabase from "../../../config/supabase.config.mjs";

// utils
import asyncWrapper from "../../../utils/asyncWrapper.mjs"
import SchemaValidationError from "../../../utils/schemaValidationError.mjs";
import SupabaseError from "../../../utils/supabaseError.mjs";

// schema
import createTasksSchema from "../schemas/createTasksSchema.mjs";

const createOne = asyncWrapper(async(req, res) => {
    const {body} = req;
    // Validate request body against schema
    const {error: schemaError, value: schemaValue} = createTasksSchema.validate(body);

    // throw schema error to the global error handler
    if(schemaError) {
        throw new SchemaValidationError(schemaError);
    }

    // populate db
    const { data, error } = await supabase
      .from("tasks")
      .insert([schemaValue])
      .select();

    // throw supabase error to global error handler
    if(error) {
        throw new SupabaseError(error);
    }

    res.status(201).json(data);
});


const createBulk = asyncWrapper(async(req, res) => {

})

export default {createOne, createBulk}