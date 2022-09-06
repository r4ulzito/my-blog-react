// assets
import SearchImg from "../../assets/search_icon.png";

// styles
import styles from "./Home.module.css";

// react
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const [query, setQuery] = useState("");
  const [posts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.home}>
      <form>
        <div className={styles.query_container}>
          <input
            type="text"
            placeholder="Busque por tags de seu interesse..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <button>
            <img src={SearchImg} alt="search icon" />
          </button>
        </div>
      </form>
      <div>
        {posts && posts.length === 0 && (
          <div className={styles.no_posts}>
            <p>Nenhum post encontrado!</p>
            <Link className="btn" to="/posts/create">
              Criar post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
