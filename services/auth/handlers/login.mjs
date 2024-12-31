// db
import supabase from "../../../config/supabase.config.mjs";

// utils
import asyncWrapper from "../../../utils/asyncWrapper.mjs";
import SchemaValidationError from "../../../utils/schemaValidationError.mjs";
import SupabaseError from "../../../utils/supabaseError.mjs";

// 
import signToken from "../utils/signToken.mjs";

// schema
import loginSchema from "../schemas/loginSchema.mjs";
import verifyPassword from "../utils/verifyPassword.mjs";

const login = asyncWrapper(async (req, res) => {
  // 
  const { body } = req;

  // Validate request body against schema
  const { error: schemaError, value: schemaValue } = loginSchema.validate(body);

  // throw schema error to the global error handler
  if (schemaError) {
    throw new SchemaValidationError(schemaError);
  }

  // query db
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", schemaValue.email);

  // throw supabase error to global error handler
  if (error) {
    throw new SupabaseError(error);
  }

  // Check if user is available
  if (data.length === 0) {
    res.status(400).json({
      status: "fail",
      message: "Incorrect email or password!",
    });
  } else {
    
    // Verify password
    const passwordVerResult = await verifyPassword(data[0].password, schemaValue.password);
    
    if(passwordVerResult) {
      //   Sign token
      const token = signToken(data[0]);
      res
        .status(200)
        .json({ status: "ok", message: "logined successfully", token });
    } else {
        res.status(400).json({
          status: "fail",
          message: "Incorrect email or password",
        });
    }

  }
});


export default login;