// db
import supabase from "../../../config/supabase.config.mjs";

//logger
import logger from "../../../logger/logger.config.mjs";

// utils
import asyncWrapper from "../../../utils/asyncWrapper.mjs";
import SchemaValidationError from "../../../utils/schemaValidationError.mjs";
import SupabaseError from "../../../utils/supabaseError.mjs";
import sendEmailVerification from "../../notification/sendEmailVerification.mjs";

// 
import hashPassword from "../utils/hashPassword.mjs";
import signToken from "../utils/signToken.mjs";

// schema
import signupSchema from "../schemas/signupSchema.mjs";

const signup = asyncWrapper(async (req, res) => {

  const { body } = req;

  // Validate request body against schema
  const { error: schemaError, value: schemaValue } =
    signupSchema.validate(body);

  // throw schema error to the global error handler
  if (schemaError) {
    throw new SchemaValidationError(schemaError);
  }

//   hash password 
  schemaValue.password = await hashPassword(schemaValue.password);

  // populate db
  const { data, error } = await supabase
    .from("users")
    .insert([schemaValue])
    .select(
      "id, email"
    );

  // throw supabase error to global error handler
  if (error) {
    throw new SupabaseError(error);
  }

  // Generate log
  logger.log("info", "new user with email (%s) created successfully.", data[0].email, {date: new Date(Date.now())});

  // Send email verification
  sendEmailVerification(data[0].email);

//   Sign token
  const token = signToken(data[0]);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // Use HTTPS
    sameSite: "Strict",
  });

  res.status(201).json({message: "Account successfully created"});
});

export default signup;
