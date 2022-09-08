// styles
import styles from "./Post.module.css";

// components
import Spinner from "react-spinner-material";

// react
import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);

  return (
    <div className={styles.post_container}>
      <div className={styles.post_content}>
        {loading && (
          <Spinner radius={40} color={"#134074"} stroke={3} visible={true} />
        )}
        {post && (
          <>
            <h1>{post.title}</h1>
            <img src={post.image} alt={post.title} />
            <p>{post.body}</p>
            <div className={styles.tags_container}>
              <h3>Fala sobre: </h3>
              {post.tagsArray.map((tag) => (
                <p key={tag}>
                  <span>#</span>
                  {tag}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
