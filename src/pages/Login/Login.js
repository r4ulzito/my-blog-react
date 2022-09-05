// styles
import styles from "./Login.module.css";

// components
import Spinner from "react-spinner-material";

// react
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // limpa os inputs
  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const { error: authError, loading, login } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    const res = await login(user);
  };

  useEffect(() => {
    if (authError) {
      toast.error(authError);
    }
  }, [authError]);

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça login para poder contar suas histórias</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.label_container}>
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
        </div>
        {!loading && <button className="btn">Entrar</button>}
        {loading && (
          <Spinner radius={40} color={"#134074"} stroke={3} visible={true} />
        )}
      </form>
    </div>
  );
};

export default Login;
