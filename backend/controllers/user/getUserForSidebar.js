import { User } from "../../models/index.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    //$ne "not equal", find all user except loggedInUser and exclude password
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUserForSidebar", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
