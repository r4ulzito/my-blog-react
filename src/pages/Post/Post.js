// styles
import styles from "./Post.module.css";

// components
import Spinner from "react-spinner-material";

// react
import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { Link } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.post_container}>
      <div className={styles.post_content}>
        <div className={styles.loader_container}>
          {loading && (
            <Spinner radius={40} color={"#134074"} stroke={3} visible={true} />
          )}
        </div>
        {post && (
          <>
            <h1>{post.title}</h1>
            <img src={post.image} alt={post.title} />
            <p>{post.body}</p>
            <h3>Fala sobre: </h3>
            <div className={styles.tags_container}>
              {post.tagsArray.map((tag) => (
                <p key={tag}>
                  <span>#</span>
                  {tag}
                </p>
              ))}
            </div>
            <div className={styles.author_credit}>
              <p>
                Autor: <span>{post.createdBy}</span>
              </p>
            </div>
          </>
        )}
      </div>
      {post && (
        <Link onClick={handleClick} to="/" className="btn btn-dark">
          Voltar
        </Link>
      )}
    </div>
  );
};

export default Post;
