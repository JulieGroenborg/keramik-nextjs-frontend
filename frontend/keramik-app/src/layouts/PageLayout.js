import HeroSektion from '@/components/HeroSektion';
export default function PageLayout({ page }) {
  if (!page) {
    return <div>siden kunne ikke findes</div>;
  }
  const { contentType, properties, route } = page;

  const isFrontpage = contentType === 'frontpage' || route?.path === '/';

  const blocks = isFrontpage ? properties.frontpageComponents?.items : properties.components?.items;

  // fallback til page name hvis der ikke er sat en title
  const pageTitle = properties.title ?? page.name;

  return (
    <div>
      {isFrontpage ? <HeroSektion page={page} /> : <h1>{pageTitle}</h1>}
      {renderBlocks(blocks)}
    </div>
  );
}

// her skal vi tilføje flere switch cases når vi får lavet komponenterne, som skal vises.
function renderBlocks(blocks) {
  if (!blocks || blocks.length === 0) return null;
  return blocks.map((item) => {
    const block = item.content;
    switch (block?.contentType) {
      case 'newsletter': // skal matche contentType i komponent objektet
        return (
          <div key={block.id}>
            <p>Nyhedsbrev komponent placeholder</p>
          </div>
        );
      default:
        return null;
    }
  });
}
