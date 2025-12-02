import createHttpError from 'http-errors';

export const updateUserAvatar = async (req, res, next) => {
  if (!req.file) {
    return next(createHttpError(400, 'No file'));
  }
  return res.status(200).json({ message: 'Avatar updated succcefully' });
};
