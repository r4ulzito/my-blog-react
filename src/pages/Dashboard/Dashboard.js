// style
import styles from "./Dashboard.module.css";

// react
import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import Spinner from "react-spinner-material";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  // posts do usuario
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);

  const deleteDocument = (id) => {};

  if (loading) {
    <div className={styles.loader_container}>
      <Spinner radius={40} color={"#134074"} stroke={3} visible={true} />
    </div>;
  }

  return (
    <div className={styles.dashboard_container}>
      <h1>Dashboard</h1>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.no_posts_container}>
          <p>Você não possui nenhum post</p>
          <Link className="btn" to="/posts/create">
            Criar post
          </Link>
        </div>
      ) : (
        <div className={styles.dashboard_content}>
          <div className={styles.content_header}>
            <span>Post</span>
            <span>Ações</span>
          </div>
          {posts &&
            posts.map((post) => (
              <div key={post.id} className={styles.post_row}>
                <p>{post.title}</p>
                <div className={styles.post_row_buttons}>
                  <Link to={`/posts/${post.id}`} className="btn btn-outline">
                    Ver
                  </Link>
                  <Link
                    to={`/posts/edit/${post.id}`}
                    className="btn btn-outline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => deleteDocument(post.id)}
                    className="btn btn-outline btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
