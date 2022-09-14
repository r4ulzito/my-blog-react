// styles
import styles from "./EditPost.module.css";

// react
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import Spinner from "react-spinner-material";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { toast } from "react-toastify";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);

  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);

      const textTags = post.tagsArray.join(", ");

      setTags(textTags);
    }
  }, [post]);

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
    <div className={styles.edit_post}>
      {post && (
        <>
          <h1>Editando Post</h1>
          <p>Altere os dados do post e compartilhe</p>
          <form onSubmit={handleSubmit}>
            <div className={styles.label_container}>
              <label>
                <span>URL da imagem</span>
                <input
                  type="text"
                  name="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Insira uma imagem ex: https://imagens/imagem"
                  autoComplete="off"
                />
              </label>
              <div className={styles.preview_image_container}>
                <p>Imagem atual:</p>
                <img src={post.image} alt={post.title} />
              </div>
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
                  Salvar e Compartilhar
                </button>
              )}
            </div>
          </form>
          {loading && (
            <Spinner radius={40} color={"#134074"} stroke={3} visible={true} />
          )}
        </>
      )}
    </div>
  );
};

export default EditPost;
