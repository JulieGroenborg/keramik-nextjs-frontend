export default function PageLayout({ page }) {
  return (
    <div>
      {page?.properties?.title?.trim() && <h1>{page.properties.title}</h1>}
      {page?.properties?.subtitle && <p>{page.properties.subtitle}</p>}
    </div>
  );
}
