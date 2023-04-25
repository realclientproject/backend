import jwt from "jsonwebtoken";

export function verifyAdmin(req, res, next) {
  let token = req.cookies["auth_token"];
  if (!token) {
    return res.status(403).send("Login Please!");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}

export function super_admin(req, res, next) {
  if (req.user.role === "superadmin") return next();
  else return res.status(401).send("Not Authorized");
}
export function admin(req, res, next) {
  if (req.user.role === "admin") return next();
  else return res.status(401).send("Not Authorized");
}
export function user(req, res, next) {
  if (req.user.role === "user") return next();
  else return res.status(401).send("Not Authorized");
}
