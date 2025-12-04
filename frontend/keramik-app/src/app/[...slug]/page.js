import { getPage } from '@/lib/umbraco/api-helpers/getPage';
import PageLayout from '@/layouts/PageLayout';
import { notFound } from 'next/navigation';

export default async function SlugPage(props) {
  // unwrap params fra props
  const params = await props.params; // <-- det nye i Next.js 16

  // Sørg for, at slug altid er et array
  const slugArray = Array.isArray(params?.slug) ? params.slug : [];
  const slugPath = '/' + slugArray.join('/') + '/';

  console.log('HER!!! SlugPage rendered with slugPath:', slugPath);

  // Hent page fra Umbraco
  const page = await getPage(slugPath);

  if (!page) {
    notFound(); // sender til Next.js 404 side
  }

  return <PageLayout page={page} />;
}
