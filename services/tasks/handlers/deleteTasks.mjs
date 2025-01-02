// db
import supabase from "../../../config/supabase.config.mjs";

// utils
import asyncWrapper from "../../../utils/asyncWrapper.mjs";
import SupabaseError from "../../../utils/supabaseError.mjs";

const deleteOne = asyncWrapper(async (req, res) => {
  // req params
  const { params } = req;
  const {user_id} = req.query;

  // populate db
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", params.id)
    .eq("user_id", user_id);


  // throw supabase error to global error handler
  if (error) {
    throw new SupabaseError(error);
  }

  res.status(204).json();
});

const deleteBulk = asyncWrapper(async (req, res) => {});

export default { deleteOne, deleteBulk };
