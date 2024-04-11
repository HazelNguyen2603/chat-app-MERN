import { removeTokenFromcookie } from "../../utils/index.js";

export const logout = async (req, res) => {
  try {
    removeTokenFromcookie(res);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
