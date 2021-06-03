import * as multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';

export const diskStorage = (type: string): multer.StorageEngine =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const saveTo = path.join(process.env.STORAGE_DIR || '/', type);
      if (!fs.existsSync(saveTo)) fs.mkdirSync(saveTo, { recursive: true });
      cb(null, saveTo);
    },
    filename: (req: any, file, cb) => {
      const hex = crypto.randomBytes(16);
      cb(null, 1 + hex.toString('hex') + '.png');
    },
  });

export const photoFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    cb(null, false);
  }
  cb(null, true);
};
