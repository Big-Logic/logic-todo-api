import asyncWrapper from "../../../utils/asyncWrapper.mjs";

const tokenBlocklist = new Set();

export default asyncWrapper(async (req, res) => {

  res.clearCookie("token", {
    httpOnly: true,
    // secure: true,
    sameSite: "Strict",
  });
  // Add token to blocklist
  // tokenBlocklist.add(schemaValue.token);

  res.json({ status: "ok", message: "successfully logout." });
})