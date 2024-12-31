import jwt from "jsonwebtoken";

export default (user) => {
    const dt = {user_id: user.id};
    return jwt.sign(dt, process.env.JWT_SECRET);
}