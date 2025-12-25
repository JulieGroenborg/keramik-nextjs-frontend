import HeroSektion from '@/components/HeroSektion';
import OmMig from '@/components/OmMig';
import ImageTextCTA from '@/components/ImageTextCTA';
import TestimonialsSection from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import KvaliteterOgVaerdier from '@/components/KvaliteterOgVaerdier';
import Contact from '@/components/Contact';
import ProductSection from '@/components/ProductSection';
import { getFilteredProducts } from '@/lib/utils/ProductFilters';
import Banner from '@/components/Banner';

export default function PageLayout({ page, products }) {
  if (!page) {
    return <div>siden kunne ikke findes</div>;
  }

  const { contentType, properties, route } = page;

  const isFrontpage = contentType === 'frontpage' || route?.path === '/';

  const blocks = isFrontpage ? properties.frontpageComponents?.items : properties.components?.items;

  // fallback til page name hvis der ikke er sat en title

  return (
    <div>
      {isFrontpage && <HeroSektion page={page} />}
      {renderBlocks(blocks, { isFrontpage, products })}
    </div>
  );
}

// her skal vi tilføje flere switch cases når vi får lavet komponenterne, som skal vises.
function renderBlocks(blocks, { isFrontpage, products = [] } = {}) {
  if (!blocks || blocks.length === 0) return null;

  return blocks.map((item) => {
    const block = item.content;
    if (!block) return null;

    switch (block.contentType) {
      case 'newsletter':
        return <Newsletter key={block.id} content={block.properties} />;

      case 'valueSection':
        if (isFrontpage) {
          // Frontpage version af valueSection
          return <OmMig key={block.id} content={block.properties} />;
        }
        // Om-mig-side version af valueSection
        return <KvaliteterOgVaerdier key={block.id} content={block.properties} />;

      case 'imageTextCTA':
        return <ImageTextCTA key={block.id} content={block.properties} />;

      case 'banner':
        return <Banner key={block.id} title={block.properties.title} />;

      case 'testimonialSection':
        return (
          <TestimonialsSection
            key={block.id}
            title={block.properties.title}
            testimonials={block.properties.list.items}
          />
        );

      case 'contactSection':
        return <Contact key={block.id} data={block} />;

      case 'productSection': {
        const { title, filterType, button } = block.properties;

        const filteredProducts = getFilteredProducts(products, filterType);

        const btnText = button?.[0]?.title;
        const btnLink = button?.[0]?.route?.path || button?.[0]?.url;

        // Tjek filterTypen og sæt varianten
        let variant = '';
        if (filterType === 'Nyeste') {
          variant = 'variantNyeste';
        } else if (filterType === 'De Grønne') {
          variant = 'variantGreen';
        }

        return (
          <ProductSection
            key={block.id}
            title={title}
            products={filteredProducts}
            variant={variant}
            buttonText={btnText}
            buttonLink={btnLink}
          />
        );
      }

      default:
        return null;
    }
  });
}
