import styles from '../css/components/Banner.module.css';

const Banner = ({ title }) => {
  return (
    <section className={styles.banner}>
      <h1 className={styles.title}>{title}</h1>
    </section>
  );
};

export default Banner;
