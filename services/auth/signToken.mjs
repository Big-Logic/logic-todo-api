import jwt from "jsonwebtoken";

export default (user) => {
    return jwt.sign(user, process.env.JWT_SECRET);
}