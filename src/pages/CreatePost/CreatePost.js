// styles
import styles from "./CreatePost.module.css";

// react
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useAuthentication } from "../../hooks/useAuthentication";
import Spinner from "react-spinner-material";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);

  const { error: authError, loading } = useAuthentication();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.create_post}>
      <h1>Criar post</h1>
      <p>Escreva sobre o que quiser e compartilhe sua história!</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.label_container}>
          <label>
            <span>URL da imagem</span>
            <input
              type="text"
              name="image"
              onChange={(e) => setImage(e.target.value)}
              placeholder="Insira uma imagem ex: https://imagens/imagem"
            />
          </label>
          <label>
            <span>Título</span>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título do post..."
              required
            />
          </label>
          <label>
            <span>Conteúdo</span>
            <textarea
              style={{ resize: "none" }}
              name="body"
              required
              placeholder="Insira o conteúdo do seu post..."
              onChange={(e) => setBody(e.target.value)}
              value={body}
            ></textarea>
          </label>
          <label>
            <span>Tags</span>
            <input
              type="text"
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Insira as tags separadas por vírgulas ex: tag,tag,tag"
              required
            />
          </label>
        </div>
        {!loading && <button className="btn">Compartilhar</button>}
        {loading && (
          <Spinner radius={40} color={"#134074"} stroke={3} visible={true} />
        )}
      </form>
    </div>
  );
};

export default CreatePost;
