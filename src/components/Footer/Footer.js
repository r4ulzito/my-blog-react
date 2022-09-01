// styles
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h3>Compartilhe seus interesses!</h3>
      <p>
        <a href="https://www.linkedin.com/in/raul-de-souza/" target="_blank">
          Developed by Raul de Souza
        </a>
      </p>
    </footer>
  );
};

export default Footer;
