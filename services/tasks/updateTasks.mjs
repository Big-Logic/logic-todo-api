// db
import supabase from "../../config/supabase.config.mjs";

// utils
import asyncWrapper from "../../utils/asyncWrapper.mjs";
import SchemaValidationError from "../../utils/schemaValidationError.mjs";
import SupabaseError from "../../utils/supabaseError.mjs";

// schema
import updateTasksSchema from "./updateTasksSchema.mjs";

const updateOne = asyncWrapper(async (req, res) => {
    // req params
    const { params } = req;
    const { user_id } = req.query;

    const {body} = req;

    // Validate request body against schema
    const { error: schemaError, value: schemaValue } =
      updateTasksSchema.validate(body);

    // throw schema error to the global error handler
    if (schemaError) {
      throw new SchemaValidationError(schemaError);
    }


    // populate db
    const { data, error } = await supabase
      .from("tasks")
      .update(schemaValue)
      .eq("id", params.id)
      .eq("user_id", user_id)
      .select("*");


    // throw supabase error to global error handler
    if (error) {
      throw new SupabaseError(error);
    }

    res.status(200).json(data);
});

const updateBulk = asyncWrapper(async (req, res) => {});

export default { updateOne, updateBulk };
