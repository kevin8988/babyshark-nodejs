const multer = require('multer');
const AppError = require('./../src/utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    const err = new AppError('Por favor, insira somente imagens!', 400);
    cb(err, false);
  }
};

module.exports = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});
