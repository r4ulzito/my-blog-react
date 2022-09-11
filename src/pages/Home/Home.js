// assets
import SearchImg from "../../assets/search_icon.png";

// styles
import styles from "./Home.module.css";

// react
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail/PostDetail";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts } = useFetchDocuments("posts");
  const navigate = useNavigate();

  // evento de busca
  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`search?q=${query}`);
    }
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
          <button onClick={handleSubmit}>
            <img src={SearchImg} alt="search icon" />
          </button>
        </div>
      </form>
      {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      {posts && posts.length === 0 && (
        <div className={styles.no_posts}>
          <p>Nenhum post encontrado!</p>
          <Link className="btn" to="/posts/create">
            Criar post
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
