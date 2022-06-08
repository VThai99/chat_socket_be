module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("message", {
      groupId: {
        type: Sequelize.INTEGER,
      },
      senderId: {
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.STRING,
      },
      is_deleted: {
        type: Sequelize.STRING,
      },
  
    });
    return Message;
  };
  