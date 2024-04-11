import bcrypt from "bcryptjs";
import { User } from "../../models/index.js";
import { generateTokenAndSetCookie } from "../../utils/index.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const isPassCorrect = await bcrypt.compare(password, user?.password || "");
    if (!user || !isPassCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      gender: user.gender,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
