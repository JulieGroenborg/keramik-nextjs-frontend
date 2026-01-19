export async function umbracoFetch(path) {
  const fixedPath = path.startsWith('/') ? path : `/${path}`;

  const res = await fetch(`${process.env.NEXT_PUBLIC_UMBRACO_URL}${fixedPath}`, {
    cache: 'force-cache', // Denne linje gør den SSG, kan ændres til 'no-store' for SSR
  });

  // Gammel kode (læste error som en tekststreng, den værdi kunne getPage ikke bruge):
  // if (!res.ok) {
  //   throw new Error(`Umbraco API error: ${res.status}`);
  // }

  // Ny kode, sikrer at vi ender i korrekte catch på getPage frem for crash/systemfejl:
  if (!res.ok) {
    // 1. Opret fejlen
    const error = new Error(`Umbraco API error: ${res.status}`);
    // 2. Tilføj status-propertyen, så getPage kan læse den
    error.status = res.status;
    // 3. Kast fejlen
    throw error;
  }

  return res.json();
}
