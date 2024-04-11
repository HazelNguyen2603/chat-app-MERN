import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    } else {
      //Check expired token
      const currentTime = Math.floor(Date.now() / 1000); // in seconds
      const decodedToken = jwt.decode(token);
      if (decodedToken.exp < currentTime) {
        return res
          .status(401)
          .json({ error: "The access token provided is expired" });
      }
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute;
