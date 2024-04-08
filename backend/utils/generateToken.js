import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });

  res.cookie("jwt", token, {
    maxAge: 90 * 24 * 60 * 60 * 1000, //milliseconds format
    httpOnly: true, //prevent XSS(cross-site scripting) attacks
    sameSite: "strict", //CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
};

export const removeTokenFromcookie = (res) => {
  return res.cookie("jwt", "", { maxAge: 0 });
};
