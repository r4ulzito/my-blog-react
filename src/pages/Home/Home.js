// assets
import SearchImg from "../../assets/search_icon.png";

// styles
import styles from "./Home.module.css";

// react
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import Spinner from "react-spinner-material";
import PostDetail from "../../components/PostDetail/PostDetail";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading, error } = useFetchDocuments("posts");

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
      {loading && (
        <Spinner radius={40} color={"#134074"} stroke={3} visible={true} />
      )}
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
