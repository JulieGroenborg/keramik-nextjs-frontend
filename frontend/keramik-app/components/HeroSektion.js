import '../CSS/components/HeroSektion.css';

export default function HeroSektion({ page }) {
  const title = page?.properties?.title;

  return (
    <div class="container">
      {title && <h1>{title}</h1>}

      {/* subtitle*/}

      {/* import reuseable knap */}

      {/* billede */}
    </div>
  );
}
