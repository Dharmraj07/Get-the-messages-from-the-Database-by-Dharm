const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const { User } = require("./users");

const ChatMessage = sequelize.define("ChatMessage", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

ChatMessage.belongsTo(User);
User.hasMany(ChatMessage, { foreignKey: "UserId" });

(async () => {
  try {
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to synchronize the models:", error);
  }
})();

module.exports = { ChatMessage };
