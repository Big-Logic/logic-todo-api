// db
import supabase from "../../config/supabase.config.mjs";

// utils
import asyncWrapper from "../../utils/asyncWrapper.mjs";
import SchemaValidationError from "../../utils/schemaValidationError.mjs";
import SupabaseError from "../../utils/supabaseError.mjs";

// schema
import getTasksSchema from "./getTasksSchema.mjs";

// GET ONE
const getOne = asyncWrapper(async (req, res) => {});

// GET BULK
const getBulk = asyncWrapper(async (req, res) => {
  const { query } = req;

// Validate query against schema
  const { error: schemaError, value: schemaValue } =
    getTasksSchema.validate(query);

// throw error to global error handler if validation fails
  if (schemaError) {
    throw new SchemaValidationError(schemaError);
  }

//   Build query
  let supabaseQuery = supabase.from("tasks").select("*");

  for (let [prop, val] of Object.entries(schemaValue)) {
    // Ensure due_date is formatted correctly
    if (prop === "due_date" && val instanceof Date) {
      val = val.toISOString().split("T")[0];
    }

    supabaseQuery = supabaseQuery.eq(prop, val);
  }

// Execute query
  const { data, error } = await supabaseQuery;

  if(error) {
    throw new SupabaseError(error);
  }

  res.status(200).json(data);
});

export default { getOne, getBulk };
