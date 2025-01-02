import jwt from "jsonwebtoken";

import asyncWrapper from "../../../utils/asyncWrapper.mjs";

export default asyncWrapper(async (req, res, next) => {

  // const token = req.headers.authorization?.split(" ")[1];
  const { token } = req.cookies;

  if (!token) return res.status(401).send({status: "fail", message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user_id = decoded.user_id;
    next();
  } catch (error) {
    res.status(400).send({status: "fail", message: "Invalid token" });
  }
});
