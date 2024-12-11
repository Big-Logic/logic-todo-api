// db
import supabase from "../../config/supabase.config.mjs";

// utils
import asyncWrapper from "../../utils/asyncWrapper.mjs";
import SupabaseError from "../../utils/supabaseError.mjs";

const deleteOne = asyncWrapper(async (req, res) => {
  // req params
  const { params } = req;
//   params.user_id = "778c7688-69da-4fa8-bf11-2864db91815f";

  // populate db
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", params.id)
    .eq("user_id", params.user_id);


  // throw supabase error to global error handler
  if (error) {
    throw new SupabaseError(error);
  }

  res.status(204).json();
});

const deleteBulk = asyncWrapper(async (req, res) => {});

export default { deleteOne, deleteBulk };
