import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        default: [],
      },
    ],
  },
  { timestamps: true } //mongo will render createAt and updateAt
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
