import { umbracoFetch } from './client';

export async function getPage(slugPath) {
  const allContent = await umbracoFetch('/content');
  const page = allContent.items.find((item) => item.route.path === slugPath);
  if (!page) throw new Error(`Page not found: ${slugPath}`);
  return page;
}
