// styles
import styles from "./Register.module.css";

// react
import { useState, useEffect } from "react";

const Register = () => {
  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie uma conta e conte suas histórias</p>
      <form>
        <div className={styles.label_container}>
          <label>
            <span>Nome</span>
            <input
              autoComplete="off"
              type="text"
              name="displayName"
              required
              placeholder="Seu nome..."
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
            />
          </label>
          <label>
            <span>Confirmação de Senha</span>
            <input
              autoComplete="off"
              type="confirmPassword"
              name="confirmPassword"
              required
              placeholder="Confirme sua senha..."
            />
          </label>
        </div>
        <button className="btn">Cadastrar</button>
      </form>
    </div>
  );
};

export default Register;
