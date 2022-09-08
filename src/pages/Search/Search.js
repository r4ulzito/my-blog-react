// styles
import styles from "./Search.module.css";

// react
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import { Link } from "react-router-dom";

// components
import PostDetail from "../../components/PostDetail/PostDetail";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.search_container}>
      <h1>Resultados da busca</h1>
      <div>
        {posts && posts.length === 0 && (
          <div className={styles.no_results_container}>
            <p>Não foram encontrados posts com essas tags...</p>
            <Link onClick={handleClick} to="/" className="btn btn-dark">
              Voltar
            </Link>
          </div>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
      {posts && posts.length !== 0 && (
        <Link onClick={handleClick} to="/" className="btn">
          Voltar
        </Link>
      )}
    </div>
  );
};

export default Search;
