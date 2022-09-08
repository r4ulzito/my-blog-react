// styles
import styles from "./PostDetail.module.css";

// react
import { Link } from "react-router-dom";

const PostDetail = ({ post }) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.post_detail}>
      <img src={post.image} alt={post.title} />
      <div className={styles.post_content_container}>
        <div className={styles.post_content}>
          <h2>{post.title}</h2>
          <p>Criado por: {post.createdBy}</p>
          <div className={styles.tags_container}>
            {post.tagsArray.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </div>
        <Link
          onClick={handleClick}
          to={`/posts/${post.id}`}
          className="btn btn-outline"
        >
          Ler
        </Link>
      </div>
    </div>
  );
};

export default PostDetail;
