import jwt from "jsonwebtoken";
import supabase from "../../config/supabase.config.mjs";

// utils
import asyncWrapper from "../../utils/asyncWrapper.mjs";

// schema
import verifyEmailSchema from "./verifyEmailSchema.mjs";

const tokenBlocklist = new Set();

export default asyncWrapper(async (req, res, next) => {
  //
  const { query } = req;

  // Validate request body against schema
  const { error: schemaError, value: schemaValue } =
    verifyEmailSchema.validate(query);

  // throw schema error to the global error handler
  if (schemaError) {
    throw new SchemaValidationError(schemaError);
  }

  if (tokenBlocklist.has(schemaValue.token))
    return res.status(400).json({ status: "fail", message: "Invalid or expire token!" });

  try {
    // Verify the token
    const decoded = jwt.verify(schemaValue.token, process.env.JWT_SECRET);

    // Find and update user status
    const { data, error } = await supabase
      .from("users")
      .update([{ email_is_verified: true }])
      .select("id, email")
      .eq("email", decoded.email);

    // throw supabase error to global error handler
    if (error) {
      throw new SupabaseError(error);
    }

    if (!data[0]) {
      return res.status(400).json({ status: "fail", message: "Invalid or expired token" });
    } else {
      // Add token to blocklist
      tokenBlocklist.add(schemaValue.token);
      // Send response
      return res
        .status(200)
        .json({ status: "ok", message: "Email successfully verified" });
    }
  } catch (err) {
    res.status(400).json({ status: "fail", message: "Invalid or expired token" });
  }
});
