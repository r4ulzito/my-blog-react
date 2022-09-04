// styles
import styles from "./Register.module.css";

// react
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // limpa os inputs
  const clearInputs = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const {
    createUser,
    error: authError,
    loading,
    setLoading,
  } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      displayName,
      email,
      password,
    };

    if (password !== confirmPassword) {
      toast.error("As senhas devem ser iguais!");
      setLoading(false);
      return;
    }

    const res = await createUser(user);

    if (typeof res === "object") {
      toast.success("Usuário cadastrado com sucesso!");
      clearInputs();
    }
  };

  useEffect(() => {
    if (authError) {
      toast.error(authError);
    }
  }, [authError]);

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie uma conta e conte suas histórias</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.label_container}>
          <label>
            <span>Nome</span>
            <input
              autoComplete="off"
              type="text"
              name="displayName"
              required
              placeholder="Seu nome..."
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </label>
          <label>
            <span>E-mail</span>
            <input
              autoComplete="off"
              type="email"
              name="email"
              required
              placeholder="Seu e-mail..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>Senha</span>
            <input
              autoComplete="off"
              type="password"
              name="password"
              required
              placeholder="Insira sua senha..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            <span>Confirmação de Senha</span>
            <input
              autoComplete="off"
              type="password"
              name="confirmPassword"
              required
              placeholder="Confirme sua senha..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
        </div>
        {!loading && <button className="btn">Cadastrar</button>}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
      </form>
    </div>
  );
};

export default Register;
