const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/secrets");

function authenticate(req, res, next) {

  // Check if session is expired
  if (!req.session.user) {
    return res
      .status(403)
      .json({ error: "Session expired, please login again!" });
  }

  // Extract token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    // Attach user info to request object
    req.user = decoded;
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
}

module.exports = authenticate;
