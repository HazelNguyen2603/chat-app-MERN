import { model } from "mongoose";
import { Conversation, Message } from "../../models";

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate({ path: "messages", model: "Message" }); //look up to Message model to get actual message not reference

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in get message controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
