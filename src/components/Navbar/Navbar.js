// styles
import styles from "./Navbar.module.css";

// react
import { NavLink } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useAuthValue();

  return (
    <nav className={styles.navbar}>
      <NavLink className={styles.logo} to="/">
        MyBlog
      </NavLink>
      <ul className={styles.nav_links}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Cadastrar
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink
                to="/posts/create"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Criar post
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Dashboard"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
