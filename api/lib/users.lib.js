const Trainers = require('../../../../models/Trainers');

const getAll = async (req, res, next) => {
  let users = await Trainers.findAll({ raw: true });
  console.log(users);
  return res.json({
    users,
  });
};

const getUserById = async (req, res, next) => {
  userId = parseInt(req.params.id);
  if (userId < 99999999999999999)
    return res.status(404).json({
      message: "invalid id",
    });
  let users = await Trainers.findOne({ where: { User: userId }, raw: true });
  res.status(200).json({
    users,
  });
};

module.exports = { getAll, getUserById };