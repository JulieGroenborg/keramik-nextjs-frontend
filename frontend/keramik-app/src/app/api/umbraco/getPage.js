import { umbracoFetch } from './client';

export async function getPage(slugPath) {
  const encodedPath = encodeURIComponent(slugPath);

  try {
    const page = await umbracoFetch(`/content/item/${encodedPath}`);
    return page; // et enkelt item
  } catch (error) {
    if (error.status === 404) {
      return null;
    }
    throw error;
  }
}
