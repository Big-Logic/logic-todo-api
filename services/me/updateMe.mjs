// db
import supabase from "../../config/supabase.config.mjs";

// utils
import asyncWrapper from "../../utils/asyncWrapper.mjs";
import SchemaValidationError from "../../utils/schemaValidationError.mjs";
import SupabaseError from "../../utils/supabaseError.mjs";

// schema
import updateSchema from "./updateSchema.mjs";

const updateMe = asyncWrapper(async (req, res) => {
  
  const { user_id } = req.query;

  const { body } = req;

  // Validate request body against schema
  const { error: schemaError, value: schemaValue } =
    updateSchema.validate(body);

  // throw schema error to the global error handler
  if (schemaError) {
    throw new SchemaValidationError(schemaError);
  }

  // populate db
  const { data, error } = await supabase
    .from("users")
    .update(schemaValue)
    .eq("id", user_id)
    .select("*");

  // throw supabase error to global error handler
  if (error) {
    throw new SupabaseError(error);
  }

  res.status(200).json(data);
});


export default updateMe;
