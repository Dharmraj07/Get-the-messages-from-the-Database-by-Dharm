const { DataTypes } = require("sequelize");


const { ChatMessage } = require("../models/chatModel");
const { User } = require("../models/users");

const postChat = async (req, res) => {
  try {
    const UserId = req.user.id;
    const user = req.user;
    const username=req.user.username;
    const { message } = req.body;
    const chatMessage = await ChatMessage.create({ username, message,UserId });
    res.status(201).json(chatMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getAllMessages = async (req, res) => {
    try {
      const messages = await ChatMessage.findAll({ order: [["createdAt", "ASC"]] });
      res.status(200).json(messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  





module.exports = { postChat,getAllMessages };
