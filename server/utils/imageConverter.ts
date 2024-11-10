import * as sharp from 'sharp';

export const convertToWebP = async (buffer: Buffer): Promise<Buffer> => {
  return await sharp(buffer).webp({ quality: 90, lossless: true }).toBuffer();
};
