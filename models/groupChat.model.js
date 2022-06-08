module.exports = (sequelize, Sequelize) => {
  const groupChat = sequelize.define("groupChat", {
    name: { type: Sequelize.STRING },
    avata: { type: Sequelize.STRING },
    lassMessId: { type: Sequelize.INTEGER },
  });
  return groupChat;
};
