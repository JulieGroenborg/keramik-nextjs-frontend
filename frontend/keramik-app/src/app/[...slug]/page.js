// src/app/[...slug]/page.js
import { getPage } from '@/app/api/umbraco/getPage';
import PageLayout from '@/app/layouts/PageLayout';
import { notFound } from 'next/navigation';

export default async function SlugPage(props) {
  // unwrap params fra props
  const params = await props.params; // <-- det nye i Next.js 16

  // Sørg for, at slug altid er et array
  const slugArray = Array.isArray(params?.slug) ? params.slug : [];
  const slugPath = '/' + slugArray.join('/') + '/';

  // Hent page fra Umbraco
  const page = await getPage(slugPath);

  if (!page) {
    notFound(); // sender til Next.js 404 side
  }

  return <PageLayout page={page} />;
}

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
