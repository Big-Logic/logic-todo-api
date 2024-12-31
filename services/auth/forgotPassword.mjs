// db
import supabase from "../../config/supabase.config.mjs";

// utils
import asyncWrapper from "../../utils/asyncWrapper.mjs";
import SchemaValidationError from "../../utils/schemaValidationError.mjs";
import SupabaseError from "../../utils/supabaseError.mjs";
import sendResetPasswordEmail from "../notification/sendResetPasswordEmail.mjs";

// schema
import requestPasswordResetSchema from "./requestPasswordResetSchema.mjs";

export default asyncWrapper(async (req, res) => {

  const { body } = req;

  // Validate request body against schema
  const { error: schemaError, value: schemaValue } =
    requestPasswordResetSchema.validate(body);

  // throw schema error to the global error handler
  if (schemaError) {
    throw new SchemaValidationError(schemaError);
  }

  // query db
  const { data, error } = await supabase
    .from("users")
    .select("email")
    .eq("email", schemaValue.email);

  // throw supabase error to global error handler
  if (error) {
    throw new SupabaseError(error);
  }

  // Check if user is available
  if (data.length === 0) {
    res.status(404).json({
      status: "fail",
      message: "No user found with your specified email!",
    });
  } else {
    try {
        // send email
        await sendResetPasswordEmail(data[0].email);
        // 
        res.status(200).json({
          status: "ok",
          message: "A link to reset your password was sent to your email!",
        });
    } catch(err) {
        res.status(500).json({
          status: "fail",
          message: "An unexpected error occured while sending your mail. Please try again later!",
        });

    }
  }
});
