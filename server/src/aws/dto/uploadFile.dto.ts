export class UploadFileOptionsDto {
  userId: string;
  recipeId?: string;
  fileType: 'avatar' | 'banner' | 'recipePhoto' | 'recipeVideo';
  originalFileName?: string;
}
