// db
import supabase from "../../config/supabase.config.mjs";

// utils
import asyncWrapper from "../../utils/asyncWrapper.mjs";
import SupabaseError from "../../utils/supabaseError.mjs";

const getMe = asyncWrapper(async (req, res) => {
  const { user_id } = req.query;

  // query db
  const { data, error } = await supabase
    .from("users")
    .select("id, first_name, middle_name, last_name, image_url, created_at, updated_at").eq('id', user_id);

  // throw supabase error to global error handler
  if (error) {
    throw new SupabaseError(error);
  }

  res.status(200).json(data);
})

export default getMe;