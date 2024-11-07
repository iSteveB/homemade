export const slugify = (text: string): string => {
  if (!text) {
    throw new Error('Text to slugify cannot be empty');
  }

  const slug = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .concat('-', Math.random().toString(36).substring(2, 7));

  if (slug.length < 1) {
    throw new Error('Slugified text resulted in empty string');
  }

  return slug;
};
