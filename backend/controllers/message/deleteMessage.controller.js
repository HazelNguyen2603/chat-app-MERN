import { isValidObjectId } from "mongoose";
import { Message } from "../../models/index.js";
import { io, getReceiverSocketId } from "../../socket/socket.js";

export const deleteMessage = async (req, res) => {
  try {
    const { id: messageId } = req.params;

    const isValid = isValidObjectId(messageId);
    if (!isValid) return res.status(400).json({ error: "Not a valid id" });

    const message = await Message.findOne({ _id: messageId });
    if (!message) return res.status(404).json({ error: "No message found" });

    await message.deleteOne();

    //SOCKET IO
    io.to([
      getReceiverSocketId(message.receiverId),
      getReceiverSocketId(message.senderId),
    ]).emit("deleteMessage", message);

    res.status(200).json({ message: message });
  } catch (error) {
    console.log("Error in delete message controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
