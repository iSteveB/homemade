import { v4 as uuidv4 } from 'uuid';
import { UploadFileOptionsDto } from 'src/aws/dto/uploadFile.dto';

export const generateFileKey = (
  options: UploadFileOptionsDto,
): {
  folderPath: string;
  fileKey: string;
} => {
  const { userId, recipeId, fileType } = options;

  let folderPath = '';
  let fileName = '';

  switch (fileType) {
    case 'avatar':
      folderPath = `users/${userId}/profile`;
      fileName = `avatar.webp`;
      break;
    case 'banner':
      folderPath = `users/${userId}/profile`;
      fileName = `banner.webp`;
      break;
    case 'recipePhoto':
      if (!recipeId) {
        throw new Error('recipeId is required for recipe photos');
      }
      folderPath = `users/${userId}/recipes/${recipeId}/photos`;
      fileName = generateUniqueFileName();
      break;
    case 'recipeVideo':
      if (!recipeId) {
        throw new Error('recipeId is required for recipe videos');
      }
      folderPath = `users/${userId}/recipes/${recipeId}/videos`;
      fileName = generateUniqueFileName();
      break;
    default:
      throw new Error('Invalid file type');
  }

  const fileKey = `${folderPath}/${fileName}`;

  return { folderPath, fileKey };
};

const generateUniqueFileName = (): string => {
  const timestamp = Date.now();
  const uniqueId = uuidv4();
  const extension = 'webp';
  return `${timestamp}_${uniqueId}.${extension}`;
};
