// styles
import { Link } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <h1>
        Sobre o <span>MyBlog</span>
      </h1>
      <p>
        Este projeto foi desenvolvido com React.js e Firebase a fins de estudo e
        implementação em portfólio
      </p>
      <Link to="/posts/create" className="btn">
        Crie seus posts
      </Link>
    </div>
  );
};

export default About;
