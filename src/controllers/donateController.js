const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../../src/utils/appError');
const { sequelize } = require('./../models/index');
const { Donate } = require('./../models');
const { Category } = require('./../models');
const { Color } = require('./../models');
const { Gender } = require('./../models');
const { DonatesPhoto } = require('./../models');
const { DonatesCategory } = require('./../models');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    const err = new AppError('Por favor, insira somente imagens!', 400);
    cb(err, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadDonatesImages = upload.fields([{ name: 'photos', maxCount: 3 }]);

exports.resizeDonatesImages = catchAsync(async (req, res, next) => {
  if (!req.files.photos) return next(new AppError('A doação deve conter pelo menos uma imagem!', 400));

  req.body.photos = [];

  await Promise.all(
    req.files.photos.map(async (file, index) => {
      const filename = `donate-${req.body.title.replace(/ /g, '-')}-${Date.now()}-${index + 1}.jpeg`;
      await sharp(file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/${filename}`);
      req.body.photos.push(filename);
    })
  );

  next();
});

exports.getDonates = catchAsync(async (req, res, next) => {
  const donates = await Donate.findAll({
    include: [{ model: Color }, { model: Category }, { model: Gender }, { model: DonatesPhoto, as: 'Photos' }]
  });

  res.status(200).json({ status: 'success', data: { donates } });
});

exports.getDonate = catchAsync(async (req, res, next) => {
  const { slug } = req.params;

  const donate = await Donate.findOne({ where: { slug }, include: [{ model: Color }, { model: Category }, { model: Gender }, { model: DonatesPhoto, as: 'Photos' }] });

  if (!donate) {
    return next(new AppError('Nenhuma doação encontrada!', 404));
  }

  res.status(200).json({ status: 'success', data: { donate } });
});

exports.createDonate = catchAsync(async (req, res, next) => {
  const { title, description, informations, colorId, genderId, categoriesId, photos } = req.body;

  let transaction;

  try {
    transaction = await sequelize.transaction();

    const donate = await Donate.create({
      title,
      description,
      informations,
      colorId,
      genderId,
      userId: req.user.id
    });

    if (!categoriesId) {
      return new AppError('Doação deve ter categorias!', 400);
    }

    const categories = await Promise.all(categoriesId.split(',').map(async el => await Category.findByPk(el)));
    await donate.setCategories(categories);

    const donatesPhotos = await Promise.all(photos.map(async el => await DonatesPhoto.create({ path: el, donateId: donate.id })));
    await donate.setPhotos(donatesPhotos);

    res.status(201).json({ status: 'success', data: { donate } });
  } catch (err) {
    if (transaction) await transaction.rollback();
    return next(new AppError('Não foi possível concluir a ação!', 403));
  }
});

exports.updateDonate = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { title, description, informations, colorId, genderId, categoriesId, userId } = req.body;

  const donate = await Donate.findByPk(id);

  if (!donate) {
    return next(new AppError('Nenhuma doação encontrada!', 404));
  }

  await donate.update({ title, description, informations, colorId, genderId, userId });

  if (categoriesId) {
    const categories = await Promise.all(categoriesId.map(async el => await Category.findByPk(el)));
    await donate.setCategories(categories);
  }

  res.status(201).json({ status: 'success', data: { donate } });
});

exports.deleteDonate = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  let transaction;

  try {
    transaction = await sequelize.transaction();

    await DonatesPhoto.destroy({ where: { donateId: id } }, { transaction });

    await DonatesCategory.destroy({ where: { donateId: id } }, { transaction });

    await Donate.destroy({ where: { id } }, { transaction });

    await transaction.commit();
  } catch (err) {
    if (transaction) await transaction.rollback();
    return next(new AppError('Não foi possível concluir a ação!', 403));
  }

  res.status(204).json({ status: 'success', data: null });
});
