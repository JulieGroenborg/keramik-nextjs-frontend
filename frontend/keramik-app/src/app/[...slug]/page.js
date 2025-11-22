import { getPage } from '@/app/api/umbraco/getPage'; //henter content fra Umbraco via API
import PageLayout from '@/app/layouts/PageLayout'; //viser title, subtitle og blocks

export default async function SlugPage({ params }) {
  const slugPath = params.slug?.length ? '/' + params.slug.join('/') + '/' : '/';

  const page = await getPage(slugPath);

  return <PageLayout page={page} />;
}

// export default async function Page({ params }) {
//   const slugPath = '/' + (params.slug?.join('/') || 'forside');
//   const page = await getPage(slugPath);

//   if (!page) return <p>Page not found</p>;

//   return <PageLayout page={page} />;
// }

// export default async function Home() {
//   // Test fetching your Umbraco content
//   const page = await getPage('/forside'); // <-- your test page path

//   console.log(page); // will show in server logs

//   return (
//     <div className={styles.page}>
//       <main className={styles.main}>
//         {page?.properties?.title?.trim() ? <h1>{page.properties.title}</h1> : null}
//       </main>
//     </div>
//   );
// }
