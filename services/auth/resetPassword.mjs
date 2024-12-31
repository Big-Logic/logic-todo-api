import {readFile} from "fs/promises";
import path from "path";

// utils
import asyncWrapper from "../../utils/asyncWrapper.mjs";
import SchemaValidationError from "../../utils/schemaValidationError.mjs";

// Schema
import {  passwordSchema } from "./resetPasswordSchema.mjs";
// auth
import hashPassword from "./hashPassword.mjs";
import supabase from "../../config/supabase.config.mjs";

// const tokenBlocklist = new Set();

const getResetPassword = asyncWrapper(async (req, res) => {

    const filePath = path.join(process.cwd(), "views/resetPassword.html");
    const data = await readFile(filePath, "utf8");

    res.send(data);
});



// 
const postResetPassword = asyncWrapper(async (req, res) => {
  // 
  const { body } = req;
  //   
  const {email} = req.decodedToken;

  // Validate request body against schema
  const { error: schemaError, value: schemaValue } =
    passwordSchema.validate(body);

  // throw schema error to the global error handler
  if (schemaError) {
    throw new SchemaValidationError(schemaError);
  }

  //   hash password
  schemaValue.password = await hashPassword(schemaValue.password);

  // populate db
  const { data, error } = await supabase
    .from("users")
    .update(schemaValue)
    .eq("email", email);

  // throw supabase error to global error handler
  if (error) {
    throw new SupabaseError(error);
  }

  res.json({status: "ok", message: "Password resetted successfully"});
})

export default {getResetPassword, postResetPassword};
