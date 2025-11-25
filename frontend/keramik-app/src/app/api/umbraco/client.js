export async function umbracoFetch(path) {
  const apiRoot = '/umbraco/delivery/api/v1';
  const fixedPath = path.startsWith('/') ? path : `/${path}`;

  const res = await fetch(`${process.env.NEXT_PUBLIC_UMBRACO_URL}${apiRoot}${fixedPath}`, {
    cache: 'force-cache', // Denne linje gør den SSG, kan ændres til 'no-store' for SSR
  });

  if (!res.ok) {
    throw new Error(`Umbraco API error: ${res.status}`);
  }

  return res.json();
}
