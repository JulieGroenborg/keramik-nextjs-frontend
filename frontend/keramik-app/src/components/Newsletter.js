import Styles from '../css/components/Newsletter.module.css';
import Button from './Button';

export default function Newsletter({ content }) {
  const title = content?.title?.trim();
  const subtitle = content?.subtitle?.trim();
  const placeholder = content?.placeholder?.trim();
  const buttonText = content?.button?.[0]?.title?.trim();

  return (
    <section className={`container ${Styles.background}`}>
      <div className={Styles.newsletterTag} />
      <div>
        {title && <h2 className={Styles.newsletterTitle}>{title}</h2>}
        {subtitle && <p className={Styles.newsletterSubtitle}>{subtitle}</p>}
      </div>
      <form className={Styles.newsletterForm}>
        <div className={Styles.field}>
          <input
            type="email"
            className={Styles.newsletterInput}
            placeholder={placeholder || 'Indtast din e-mail'}
            required
          />
          <div className={Styles.newsletterButton}>
            <Button type="submit">{buttonText || 'Tilmeld'}</Button>
          </div>
        </div>
      </form>
    </section>
  );
}
