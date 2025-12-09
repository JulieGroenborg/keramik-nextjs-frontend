import HeroSektion from '@/components/HeroSektion';
import OmMig from '@/components/OmMig';
import ImageTextCTA from '@/components/ImageTextCTA';
import TestimonialsSection from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

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
      case 'newsletter':
        return <Newsletter key={block.id} content={block.properties} />;
      case 'valueSection':
        return <OmMig key={block.id} content={block.properties} />;
      case 'imageTextCTA':
        return <ImageTextCTA key={block.id} content={block.properties} />;

      case 'testimonialSection':
        return (
          <TestimonialsSection
            key={block.id}
            title={block.properties.title}
            testimonials={block.properties.list.items}
          />
        );

      case 'footer':
        return <Footer key={block.id} content={block.properties} />;

      default:
        return null;
    }
  });
}
