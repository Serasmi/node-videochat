const { handleError } = require("../utils");
const messagesControllerFactory = (db) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const deleteUsers = async (req) => {
    const userId = req.params.id;

    if (!userId) {
      return handleError(new Error("You must supply a user id."));
    }

    try {
      const userToDelete = await db.findById(userId);

      if (!userToDelete) {
        return (
          new Error("User not found, nothing to delete."), { statusCode: 404 }
        );
      }

      const deletedUser = await db.remove(userToDelete);

      return {
        headers,
        statusCode: 200,
        body: deletedUser,
      };
    } catch (e) {
      return handleError(e);
    }
  };

  const getUsers = async () => {
    try {
      const users = await db.findAll();
      return {
        headers,
        statusCode: 200,
        body: users,
      };
    } catch (e) {
      return handleError(e);
    }
  };

  const patchUsers = async () => {
    // TODO: implement logic here
  };

  const postUsers = async () => {
    // TODO: implement logic here
  };

  return { deleteUsers, getUsers, patchUsers, postUsers };
};

module.exports = { messagesControllerFactory };
