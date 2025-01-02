import * as argon2 from "argon2";

export default async (hashedPassword, password) => {
  return await argon2.verify(hashedPassword, password);
};
