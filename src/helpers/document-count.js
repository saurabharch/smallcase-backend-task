const { GeneralError } = require("../utils/error");

module.exports = async (Model) => {
  try {
    return await Model.estimatedDocumentCount();
  } catch (error) {
    throw new GeneralError(error);
  }
};
