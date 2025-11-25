import { umbracoFetch } from './client';

export async function getPage(slugPath) {
  const allContent = await umbracoFetch('/content');
  const page = allContent.items.find((item) => item.route.path === slugPath);

  // Bruges til fejlfinding under udvikling, skal ændres til nedenstående i efter udvikling
  // return page ?? null;
  if (!page) throw new Error(`Page not found: ${slugPath}`);
  return page;
}
