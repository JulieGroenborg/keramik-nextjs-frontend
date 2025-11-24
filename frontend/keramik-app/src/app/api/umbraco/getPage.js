import { umbracoFetch } from './client';

export async function getPage(route) {
  return umbracoFetch(`/content/item?route=${route}`);
}
