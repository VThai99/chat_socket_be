module.exports = (sequelize, Sequelize) => {
    const memberGroup = sequelize.define("groupMember", {
      userId: {
        type: Sequelize.INTEGER,
      },
      groupId: {
        type: Sequelize.INTEGER,
      },
      seenMessageId: {
        type: Sequelize.INTEGER,
      },
    });
    return memberGroup;
  };
