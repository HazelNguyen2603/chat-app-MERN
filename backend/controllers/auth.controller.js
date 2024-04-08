export const signup = async (req, res) => {
  try {
    const { fullName, usernam, password, confirmPassword, gender } = req.body;
  } catch (error) {
    console.log("first", error);
  }
};

export const login = (req, res) => {
  res.send("login");

  console.log("login");
};

export const logout = (req, res) => {
  res.send("logout");

  console.log("logout");
};
