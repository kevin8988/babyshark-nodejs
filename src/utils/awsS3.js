const AWS = require('aws-sdk');
const AppError = require('./appError');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.saveFile = (file, fileName, userId, next) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `user-${userId}/${fileName}`,
    Body: file,
    ACL: 'public-read'
  };

  const data = s3.upload(params, function(s3Err) {
    if (s3Err) return next(new AppError('Não foi possível salvar imagem da doação!', 403));
  });

  const url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com${data.singlePart.httpRequest.path}`;

  return url;
};

exports.deleteFile = (keys, next) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Delete: {
      Objects: keys
    }
  };

  s3.deleteObjects(params, function(s3Err) {
    if (s3Err) return next(new AppError('Não foi possível salvar imagem da doação!', 403));
  });
};
