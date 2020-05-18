import path from 'path';
import crypto from 'crypto';

import multer from 'multer';

const tempFolder = path.resolve(__dirname, '..', '..', 'temp');
const uploadsFolder = path.resolve(tempFolder, 'uploads');
export default {
  tempFolder,
  uploadsFolder,

  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
