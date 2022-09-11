// style
import styles from "./Dashboard.module.css";

// react
import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  // posts do usuario
  const posts = [];

  return (
    <div>
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
        <div>TEM POST</div>
      )}
    </div>
  );
};

export default Dashboard;
