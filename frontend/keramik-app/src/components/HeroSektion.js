import '../css/components/HeroSektion.css';
import '../css/stylesheet.css';

export default function HeroSektion({ page }) {
  const title = page?.properties?.title?.trim();

  return (
    <div className="container">
      {title && <h1>{title}</h1>}

      {/* subtitle*/}

      {/* import reuseable knap */}

      {/* billede */}
    </div>
  );
}
