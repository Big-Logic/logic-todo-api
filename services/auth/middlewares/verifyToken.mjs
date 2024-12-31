import jwt from "jsonwebtoken";

import { readFile } from "fs/promises";
import path from "path";

// utils
import asyncWrapper from "../../../utils/asyncWrapper.mjs";
import SchemaValidationError from "../../../utils/schemaValidationError.mjs";

// Schema
import { tokenSchema } from "../resetPasswordSchema.mjs";

const tokenBlocklist = new Set();

export default asyncWrapper(async (req, res, next) => {
  //
  const { query } = req;

  // Validate request body against schema
  const { error: schemaError, value: schemaValue } =
    tokenSchema.validate(query);

  // throw schema error to the global error handler
  if (schemaError) {
    throw new SchemaValidationError(schemaError);
  }

  if (tokenBlocklist.has(schemaValue.token))
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid or expire token!" });

  try {
    // Verify the token
    const decoded = jwt.verify(schemaValue.token, process.env.JWT_SECRET);

    req.decodedToken = decoded;

    next();

  } catch (err) {
    
    const filePath = path.join(process.cwd(), "views/invalidToken.html");
    const data = await readFile(filePath, "utf8");

    res.status(400).send(data);
  }
});
