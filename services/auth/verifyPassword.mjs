import * as argon2 from "argon2";

export default async (hashedPassword, password) => {
  console.log(hashedPassword);
  return await argon2.verify(hashedPassword, password);
};
