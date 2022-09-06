// styles
import styles from "./CreatePost.module.css";

// react
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import Spinner from "react-spinner-material";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);

  const { user } = useAuthValue();
  const { insertDocument, response, loading } = useInsertDocument("posts");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    //validação da url de imagem
    try {
      new URL(image);
    } catch (error) {
      toast.error("A imagem precisa ser uma URL!");
      return;
    }

    // cria array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // checar todos os valores
    if (!title || !image || !tags || !body) {
      toast.error("Por favor, preencha todos os campos!");
      return;
    }

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    toast.success("Post compartilhado com sucesso!");

    // redirect pra home
    navigate("/");
  };

  if (response.error) {
    toast.error(response.error);
  }

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
              autoComplete="off"
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
              placeholder="Insira as tags separadas por vírgulas ex: tag, tag, tag"
              required
            />
          </label>
          {!loading && (
            <button className="btn" onClick={handleSubmit}>
              Compartilhar
            </button>
          )}
        </div>
        {loading && (
          <Spinner radius={40} color={"#134074"} stroke={3} visible={true} />
        )}
      </form>
    </div>
  );
};

export default CreatePost;
