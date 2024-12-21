import * as argon2 from "argon2";

export default async (password) => {

    const hash = await argon2.hash(password);

    return hash;
}
