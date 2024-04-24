import mongoose from "mongoose";

const credentialSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  provider: String,
  subject: String,
});

const Credential = mongoose.model("Credential", credentialSchema);

export default Credential;
